import { useCallback, useEffect, useState } from "react"
import axios from "axios";
import { fastAPIURL } from "../../properties/properties";
import { responseRealPhotoData } from "../../type/api/photo";

export const useGetRealPhotoList = (place_id: string | null) => {
    const [realPhotoList, setRealPhotoList] = useState<responseRealPhotoData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchRealPhotos = useCallback(() => {
        if(place_id){
            axios.get(`${fastAPIURL}/photos/reals/list/${place_id}`)
            .then(response => {
                setRealPhotoList(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
        }
    }, [place_id]);

    useEffect(() => {
        fetchRealPhotos();
    }, [fetchRealPhotos]);

    return { realPhotoList, loading, error, fetchRealPhotos };
};