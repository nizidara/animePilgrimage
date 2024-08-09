import axios from "axios";
import { ChangeEvent, FC, memo, useEffect, useState, useCallback, useRef} from "react"
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import mapboxgl from 'mapbox-gl';
import { mapboxAccessToken } from "../../../properties/properties";
import { useMapbox } from "../../../hooks/maps/useMapbox";
import { SearchMapBoxForm } from "../form/SearchMapboxForm";

mapboxgl.accessToken = mapboxAccessToken;

type SearchMapProps = {
    onSelectCoords: (lat: number, lng: number) => void
}

export const SearchMap: FC<SearchMapProps> = memo((props) => {
    const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]);
    const [selectedCoords, setSelectedCoords] = useState<[number, number] | null>(null);
    const { onSelectCoords } = props;

    const mapContainer = useRef<HTMLDivElement>(null);
    const [lng, setLng] = useState(139.8);
    const [lat, setLat] = useState(35.7);
    const [zoom, setZoom] = useState(7);

    const map = useMapbox({
        containerRef: mapContainer,
        center: [lng, lat],
        zoom: zoom
    });

    const handleSearch = (searchResult: { lat: number; lng: number }) => {
        if (map.current) {
            const marker = new mapboxgl.Marker({ draggable: true })
                .setLngLat([searchResult.lng, searchResult.lat])
                .addTo(map.current);
    
            // Add a click event listener
            marker.getElement().addEventListener('click', () => {
                setSelectedCoords([searchResult.lng, searchResult.lat]);
                onSelectCoords(searchResult.lat, searchResult.lng);
            });
    
            // Handle marker drag end
            marker.on('dragend', function () {
                const lngLat = marker.getLngLat();
                setSelectedCoords([lngLat.lng, lngLat.lat]);
                onSelectCoords(searchResult.lat, searchResult.lng);
            });
    
            setMarkers((prevMarkers) => [...prevMarkers, marker]);
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