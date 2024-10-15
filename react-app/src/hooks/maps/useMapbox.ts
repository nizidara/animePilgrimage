import { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxLanguage from '@mapbox/mapbox-gl-language';

type UseMapboxParams = {
    containerRef: React.RefObject<HTMLDivElement>;
    center: [number, number];
    zoom: number;
    onMove?: (lng: number, lat: number, zoom: number) => void;
}

export const useMapbox = (props: UseMapboxParams) => {
    const mapInstance = useRef<mapboxgl.Map | null>(null);
    const { containerRef, center, zoom, onMove } = props;

    useEffect(() => {
        if (mapInstance.current || !containerRef.current) return;

        mapInstance.current = new mapboxgl.Map({
            container: containerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: center,
            zoom: zoom,
        });

        const language = new MapboxLanguage();
        mapInstance.current.addControl(language);

        if (onMove) {
            mapInstance.current.on('move', () => {
                const lng = Number(mapInstance.current!.getCenter().lng.toFixed(4));
                const lat = Number(mapInstance.current!.getCenter().lat.toFixed(4));
                const currentZoom = Number(mapInstance.current!.getZoom().toFixed(2));
                onMove(lng, lat, currentZoom);
            });
        }
    }, [containerRef, center, zoom, onMove]);

    return mapInstance;
};