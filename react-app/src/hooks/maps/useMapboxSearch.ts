import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export type Suggestion = {
    mapbox_id: string;
    name: string;
    address?: string;
};

export type SearchResult = {
    lat: number;
    lng: number;
};

const useMapboxSearch = () => {
    const [sessionToken] = useState(uuidv4());
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // 検索候補を取得
    const fetchSuggestions = async () => {
        if (!query) return;
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(
                `https://api.mapbox.com/search/searchbox/v1/suggest?q=${encodeURIComponent(query)}&language=ja&session_token=${sessionToken}&access_token=pk.eyJ1Ijoic2VhcmNoLW1hY2hpbmUtdXNlci0xIiwiYSI6ImNrb2E2YzZheDA2ZHoydnFxOG95cjNuMWoifQ.TXC7Q4hjr1nktFft_n0Eog`
            );
            const data = await response.json();
            if (data.suggestions) {
                setSuggestions(
                    data.suggestions.map((item: any) => ({
                        mapbox_id: item.mapbox_id,
                        name: item.name,
                        address: item.address,
                    }))
                );
            } else {
                setSuggestions([]);
            }
        } catch (err) {
            setError("候補を取得できませんでした");
        } finally {
            setLoading(false);
        }
    };

    // 候補を選択して詳細を取得
    const fetchLocationDetails = async (
        mapbox_id: string,
        onSearch: (result: SearchResult) => void
    ) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(
                `https://api.mapbox.com/search/searchbox/v1/retrieve/${mapbox_id}?session_token=${sessionToken}&access_token=pk.eyJ1Ijoic2VhcmNoLW1hY2hpbmUtdXNlci0xIiwiYSI6ImNrb2E2YzZheDA2ZHoydnFxOG95cjNuMWoifQ.TXC7Q4hjr1nktFft_n0Eog`
            );
            const data = await response.json();
            if (data.features && data.features[0]) {
                const [lng, lat] = data.features[0].geometry.coordinates;
                onSearch({ lat, lng });
            } else {
                setError("地点情報を取得できませんでした");
            }
        } catch (err) {
            setError("リクエストに失敗しました");
        } finally {
            setLoading(false);
        }
    };

    return {
        query,
        setQuery,
        fetchSuggestions,
        fetchLocationDetails,
        suggestions,
        loading,
        error,
    };
};

export default useMapboxSearch;
