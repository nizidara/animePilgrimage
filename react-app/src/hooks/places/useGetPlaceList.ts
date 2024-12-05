import { useEffect, useState } from "react"
import axios from "axios";
import { fastAPIURL } from "../../properties/properties";
import { responsePlaceData } from "../../type/api/place";

export const useGetPlaceList = (name?: string | null, anime_id?: string | null, region_id?: string | null, page: number = 1, page_size: number = 20) => {
    const [placeList, setPlaceList] = useState<responsePlaceData[]>([]);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const queryName = name ? `&name=${name}` : '';
        const queryAnimeId = anime_id ? `&anime_id=${anime_id}` : '';
        const queryRegionId = region_id ? `&region_id=${region_id}` : '';
        const queryPage = `&page=${page}`;
        const queryPageSize = `&page_size=${page_size}`;

        setLoading(true);

        axios.get(`${fastAPIURL}/places/list/search?${queryName}${queryAnimeId}${queryRegionId}${queryPage}${queryPageSize}`)
        .then(response => {
            setPlaceList(response.data.places);
            setTotalCount(response.data.total_count);
            setLoading(false);
        })
        .catch(error => {
            setError(error.message);
            setLoading(false);
        });
    }, [name, anime_id, region_id, page, page_size]);

    return { placeList, totalCount, loading, error };
};