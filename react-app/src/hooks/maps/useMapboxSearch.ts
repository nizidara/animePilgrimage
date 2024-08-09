import { useState } from "react";

type SearchResult = {
  lat: number;
  lng: number;
}

const useMapboxSearch = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

    const handleSearch = async (onSearch: (result: SearchResult) => void) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
                    query
                )}.json?access_token=pk.eyJ1Ijoic2VhcmNoLW1hY2hpbmUtdXNlci0xIiwiYSI6ImNrb2E2YzZheDA2ZHoydnFxOG95cjNuMWoifQ.TXC7Q4hjr1nktFft_n0Eog`
            );
            const data = await response.json();
            if (data.features && data.features.length > 0) {
                const [lng, lat] = data.features[0].geometry.coordinates;
                onSearch({ lat, lng });
            } else {
                setError('No results found');
            }
        } catch (err) {
            setError('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

  return {
        query,
        setQuery,
        handleSearch,
        loading,
        error,
    };
};

export default useMapboxSearch;
