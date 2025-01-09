import { useCallback, useEffect, useState } from "react"
import axios from "axios";
import { fastAPIURL } from "../../properties/properties";
import { responsePlaceIconData } from "../../type/api/photo";

export const useGetPlaceIcon = (place_id: string | null) => {
    const [placeIcon, setPlaceIcon] = useState<responsePlaceIconData>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPlaceIcon = useCallback(() => {
        if(place_id){
            axios.get(`${fastAPIURL}/photos/places/icons/${place_id}`)
            .then(response => {
                setPlaceIcon(response.data);
                setLoading(false);
            })
            .catch((err) => {
                if (axios.isAxiosError(err) && err.response?.status === 404) {
                    // 404エラーの場合はエラーを無視
                    setPlaceIcon(undefined);
                } else {
                    // 他のエラーはエラー状態として扱う
                    setError("アイコン取得中にエラーが発生しました");
                }
                setLoading(false);
            });
        }
    }, [place_id]);

    useEffect(() => {
        fetchPlaceIcon();
    }, [fetchPlaceIcon])

  return { placeIcon, loading, error, fetchPlaceIcon };
};