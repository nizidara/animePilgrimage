import { useEffect, useState } from "react"
import { fastAPIURL } from "../../properties/properties";
import { responseEditAnimeData } from "../../type/api/anime";
import api from "../../api/axiosInstance";

export const useAdminGetRequestAnimeList = () => {
    const [requestAnimeList, setRequestAnimeList] = useState<responseEditAnimeData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        api.get(`${fastAPIURL}/anime/list/edit`)
            .then(response => {
                setRequestAnimeList(response.data);
                setLoading(false);
            })
            .catch(() => {
                setError("問い合わせ情報取得中にエラーが発生しました");
                setLoading(false);
            });
    }, []);

    return { requestAnimeList, loading, error };
};