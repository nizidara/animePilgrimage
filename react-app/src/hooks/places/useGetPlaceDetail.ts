import { useCallback, useEffect, useState } from "react"
import axios from "axios";
import { fastAPIURL } from "../../properties/properties";
import { responsePlaceData } from "../../type/api/place";

export const useGetPlaceDetail = (place_id: string | null) => {
    const [place, setPlace] = useState<responsePlaceData>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPlaceDetail = useCallback(() => {
        if(place_id){
            axios.get(`${fastAPIURL}/places/detail/${place_id}`)
            .then(response => {
                setPlace(response.data);
                setLoading(false);
            })
            .catch(() => {
                setError("聖地情報取得中にエラーが発生しました");
                setLoading(false);
            });
        }
    }, [place_id]);

    useEffect(() => {
        fetchPlaceDetail();
    }, [fetchPlaceDetail])

    return { place, loading, error, fetchPlaceDetail };
};