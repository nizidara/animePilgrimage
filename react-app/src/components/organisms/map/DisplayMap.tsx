import { FC, memo, useEffect, useRef, useState } from "react"
import mapboxgl from 'mapbox-gl';
import '../../../thema/map/MapStyles.css';
import { GeoJson } from "../../../type/externalAPI/mapbox";
import { mapboxAccessToken } from "../../../properties/properties";
import defaultMarkerIcon from '../../../thema/map/mapbox-icon.png';
import { useMapbox } from "../../../hooks/maps/useMapbox";

mapboxgl.accessToken = mapboxAccessToken;

type DisplayMapProps = {
    geojson: GeoJson;
    onMarkerClick?: (placeId: string) => void;
    coodinates: [number, number];
}

export const DisplayMap: FC<DisplayMapProps> = memo((props) => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const { geojson, onMarkerClick, coodinates } = props;
    const [lng, setLng] = useState(coodinates ? coodinates[0] : 139.8);
    const [lat, setLat] = useState(coodinates ? coodinates[1] : 35.7);
    const [zoom, setZoom] = useState(coodinates ? 12 : 7);
    
    const map = useMapbox({
        containerRef: mapContainer,
        center: [lng, lat],
        zoom: zoom,
        onMove: (newLng, newLat, newZoom) => {
          setLng(newLng);
          setLat(newLat);
          setZoom(newZoom);
        },
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