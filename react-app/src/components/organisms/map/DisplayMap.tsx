import { FC, memo, useEffect, useRef, useState } from "react"
import mapboxgl from 'mapbox-gl';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import '../../../thema/map/MapStyles.css';
import { GeoJson } from "../../../type/externalAPI/mapbox";
import { mapboxAccessToken } from "../../../properties/properties";

mapboxgl.accessToken = mapboxAccessToken;

export const DisplayMap: FC = memo(() => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [lng, setLng] = useState(139.8);
    const [lat, setLat] = useState(35.7);
    const [zoom, setZoom] = useState(7);

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
            if(map.current){
                setLng(Number(map.current.getCenter().lng.toFixed(4)));
                setLat(Number(map.current.getCenter().lat.toFixed(4)));
                setZoom(Number(map.current.getZoom().toFixed(2)));
            }
        });
    });

    const geojson: GeoJson = {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [-77.032, 38.913]
                },
                properties: {
                    title: 'Mapbox',
                    description: 'Washington, D.C.'
                }
            },
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [-122.414, 37.776]
                },
                properties: {
                    title: 'Mapbox',
                    description: 'San Francisco, California'
                }
            }
        ]
    };

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        geojson.features.forEach(marker => {
            const el = document.createElement('div');
            el.className = 'marker';

            if(map.current){
                new mapboxgl.Marker(el)
                    .setLngLat(marker.geometry.coordinates) //緯度経度
                    .setPopup( //ポップアップ
                        new mapboxgl.Popup({ offset: 25 })
                            .setHTML(`<h3>${marker.properties.title}</h3><p>${marker.properties.description}</p>`)
                    )
                    .addTo(map.current); //マップに追加
            }
        });
    }, [geojson]);

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