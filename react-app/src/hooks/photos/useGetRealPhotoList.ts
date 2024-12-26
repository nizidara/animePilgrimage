import { useCallback, useEffect, useState } from "react"
import axios from "axios";
import { fastAPIURL } from "../../properties/properties";
import { responseRealPhotoData } from "../../type/api/photo";

export const useGetRealPhotoList = (place_id: string | null, page: number = 1, page_size: number = 12) => {
    const [realPhotoList, setRealPhotoList] = useState<responseRealPhotoData[]>([]);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchRealPhotos = useCallback(() => {
        const queryPage = `?page=${page}`;
        const queryPageSize = `&page_size=${page_size}`;

        if(place_id){
            axios.get(`${fastAPIURL}/photos/reals/list/${place_id}${queryPage}${queryPageSize}`)
            .then(response => {
                setRealPhotoList(response.data.photos);
                setTotalCount(response.data.total_count);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
        }
    }, [place_id, page, page_size]);

    useEffect(() => {
        fetchRealPhotos();
    }, [fetchRealPhotos]);

    return { realPhotoList, totalCount, loading, error, fetchRealPhotos };
};