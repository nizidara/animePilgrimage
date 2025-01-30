import { useEffect, useState } from "react"
import { fastAPIURL } from "../../properties/properties";
import api from "../../api/axiosInstance";
import { responseRequestPlaceData } from "../../type/api/place";

export const useAdminGetRequestPlaceDetail = (request_place_id: string | number | null) => {
    const [requestPlace, setRequestPlace] = useState<responseRequestPlaceData>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        api.get(`${fastAPIURL}/places/request/detail/${request_place_id}`)
            .then(response => {
                setRequestPlace(response.data);
                setLoading(false);
            })
            .catch(() => {
                setError("問い合わせ情報取得中にエラーが発生しました");
                setLoading(false);
            });
    }, [request_place_id]);

    return { requestPlace, loading, error };
};