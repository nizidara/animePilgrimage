import { FC, memo, useEffect, useRef, useState } from "react"
import mapboxgl from 'mapbox-gl';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import '../../../thema/map/MapStyles.css';
import { GeoJson } from "../../../type/externalAPI/mapbox";
import { mapboxAccessToken } from "../../../properties/properties";
import defaultMarkerIcon from '../../../thema/map/mapbox-icon.png';

mapboxgl.accessToken = mapboxAccessToken;

type DisplayMapProps = {
    geojson: GeoJson;
    onMarkerClick?: (placeId: string) => void;
}

export const DisplayMap: FC<DisplayMapProps> = memo((props) => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [lng, setLng] = useState(139.8);
    const [lat, setLat] = useState(35.7);
    const [zoom, setZoom] = useState(7);
    const { geojson, onMarkerClick } = props;

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current ?? "",
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });

        const language = new MapboxLanguage();
        map.current.addControl(language);
    }, [lng, lat, zoom]);

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
            if (map.current) {
                setLng(Number(map.current.getCenter().lng.toFixed(4)));
                setLat(Number(map.current.getCenter().lat.toFixed(4)));
                setZoom(Number(map.current.getZoom().toFixed(2)));
            }
        });
    });

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        geojson.features.forEach(marker => {
            const el = document.createElement('div');
            el.className = 'marker';
            el.style.backgroundImage = marker.properties.icon ? `url(${marker.properties.icon})` : `url(${defaultMarkerIcon})`;
            if (map.current) {
                new mapboxgl.Marker(el)
                    .setLngLat(marker.geometry.coordinates) //緯度経度
                    .setPopup( //ポップアップ
                        new mapboxgl.Popup({ offset: 25 })
                            .setHTML(`<h3>${marker.properties.title}</h3><p>${marker.properties.description}</p>`)
                    )
                    .addTo(map.current)
                    .getElement().addEventListener('click', () => {
                        (onMarkerClick && marker.properties.place_id) && onMarkerClick(marker.properties.place_id); // Pass the placeId to the callback
                    }); //マップに追加
            }
        });
    }, [geojson, onMarkerClick]);

    return (
        <>
            <div ref={mapContainer} className="map-container">
                <div className="sidebar">
                    Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
                </div>
            </div>
        </>
    );
});