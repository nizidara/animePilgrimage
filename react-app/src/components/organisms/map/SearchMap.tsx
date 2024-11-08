import { FC, memo, useEffect, useState, useRef} from "react"
import mapboxgl from 'mapbox-gl';
import { mapboxAccessToken } from "../../../properties/properties";
import { useMapbox } from "../../../hooks/maps/useMapbox";
import { SearchMapBoxForm } from "../form/SearchMapboxForm";
import { applyScale, setupMarkerEvents } from "../../../utilities/mapbox/markerUtils";

mapboxgl.accessToken = mapboxAccessToken;

type SearchMapProps = {
    onSelectCoords: (lat: number, lng: number) => void;
    latitude?: number;
    longitude?: number;
}

export const SearchMap: FC<SearchMapProps> = memo((props) => {
    const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]);
    const [initialMarker, setInitialMarker] = useState<mapboxgl.Marker | null>(null); // 初期マーカー用の状態
    const [selectedMarker, setSelectedMarker] = useState<mapboxgl.Marker | null>(null);
    const [selectedCoords, setSelectedCoords] = useState<[number, number] | null>(null);
    const { onSelectCoords, longitude, latitude } = props;

    const mapContainer = useRef<HTMLDivElement>(null);
    const lng = longitude || 139.8;
    const lat = latitude || 35.7;
    const zoom = latitude && longitude ? 15 : 7;

    const map = useMapbox({
        containerRef: mapContainer,
        center: [lng, lat],
        zoom: zoom
    });

    // initial marker
    useEffect(() => {
        if (map.current && latitude && longitude && !initialMarker) {
            const marker = new mapboxgl.Marker({ draggable: true })
                .setLngLat([longitude, latitude])
                .addTo(map.current);

            setupMarkerEvents(
                marker,
                onSelectCoords,
                setSelectedMarker,
                setSelectedCoords
            );

            setInitialMarker(marker); 
            applyScale(marker);
            setSelectedCoords([longitude, latitude]);
            onSelectCoords(latitude, longitude);
            
            //clean up
            return () => {
                marker.remove();
            };
        }
    }, [map]);

    const handleSearch = (searchResult: { lat: number; lng: number }) => {
        if (map.current) {
            // 既存のマーカーをすべて削除
            markers.forEach(marker => marker.remove());
            if (initialMarker) {
                initialMarker.remove(); // 
                setInitialMarker(null);
            }

            const marker = new mapboxgl.Marker({ draggable: true })
                .setLngLat([searchResult.lng, searchResult.lat])
                .addTo(map.current);

            setupMarkerEvents(
                marker,
                onSelectCoords,
                setSelectedMarker,
                setSelectedCoords
            );

            // 検索結果に基づいてマーカーを選択状態にする
            applyScale(marker);
            setSelectedMarker(marker);
            setSelectedCoords([searchResult.lng, searchResult.lat]);
            onSelectCoords(searchResult.lat, searchResult.lng);
    
            setMarkers([marker]);
            map.current.flyTo({ center: [searchResult.lng, searchResult.lat], zoom: 15 });
        }
    };
  
    return (
        <>
            <div ref={mapContainer} className="map-container"></div>
            <SearchMapBoxForm onSearch={handleSearch} />
            {selectedCoords && (
                <div>
                Selected Coordinates: {selectedCoords[1]}, {selectedCoords[0]}
                </div>
            )}
        </>
    );
});