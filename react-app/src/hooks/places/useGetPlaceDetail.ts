import { useCallback, useEffect, useState } from "react"
import axios from "axios";
import { fastAPIURL } from "../../properties/properties";
import { responsePlaceData } from "../../type/api/place";
import api from "../../api/axiosInstance";

export const useGetPlaceDetail = (place_id: string | null) => {
    const [place, setPlace] = useState<responsePlaceData>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPlaceDetail = useCallback(() => {
        if(place_id){
            //not auth
            axios.get(`${fastAPIURL}/places/detail/${place_id}`)
            .then(response => {
                setPlace(response.data);
            }).catch((err) => {
                //place.flag == 1
                if(err.response.status === 401){
                    api.get(`${fastAPIURL}/places/detail/${place_id}`)
                    .then(response =>{
                        setPlace(response.data);
                    })
                    .catch(() => {
                        setError("この聖地は現在は利用できません。");
                    })
                }else{
                    setError("聖地情報取得中にエラーが発生しました");
                }
            })
            .finally(() => {
                setLoading(false);
            })
        }
    }, [place_id]);

    useEffect(() => {
        fetchPlaceDetail();
    }, [fetchPlaceDetail])

    return { place, loading, error, fetchPlaceDetail };
};