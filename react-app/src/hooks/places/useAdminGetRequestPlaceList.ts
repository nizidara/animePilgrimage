import { useEffect, useState } from "react"
import { fastAPIURL } from "../../properties/properties";
import api from "../../api/axiosInstance";
import { responseRequestPlaceData } from "../../type/api/place";

export const useAdminGetRequestPlaceList = () => {
    const [requestPlaceList, setRequestPlaceList] = useState<responseRequestPlaceData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        api.get(`${fastAPIURL}/places/request/list`)
            .then(response => {
                setRequestPlaceList(response.data);
                setLoading(false);
            })
            .catch(() => {
                setError("問い合わせ情報取得中にエラーが発生しました");
                setLoading(false);
            });
    }, []);

    return { requestPlaceList, loading, error };
};