import { useEffect, useState } from "react"
import axios from "axios";
import { fastAPIURL } from "../../properties/properties";
import { responsePlaceData } from "../../type/api/place";

export const useGetPlaceList = (name?: string | null, anime_id?: string | null, region_id?: string | null) => {
    const [placeList, setPlaceList] = useState<responsePlaceData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const queryName = name ? `&name=${name}` : '';
        const queryAnimeId = anime_id ? `&anime_id=${anime_id}` : '';
        const queryRegionId = region_id ? `&region_id=${region_id}` : '';

        axios.get(`${fastAPIURL}/places/list/search?${queryName}${queryAnimeId}${queryRegionId}`)
        .then(response => {
            setPlaceList(response.data);
            setLoading(false);
        })
        .catch(error => {
            setError(error.message);
            setLoading(false);
        });
    }, [name, anime_id, region_id]);

    return { placeList, loading, error };
};