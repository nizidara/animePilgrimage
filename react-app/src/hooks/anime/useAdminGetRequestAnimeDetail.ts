import { useEffect, useState } from "react"
import { fastAPIURL } from "../../properties/properties";
import { responseEditAnimeData } from "../../type/api/anime";
import api from "../../api/axiosInstance";

export const useAdminGetRequestAnimeDetail = (request_anime_id: string | number | null) => {
    const [requestAnime, setRequestAnime] = useState<responseEditAnimeData>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        api.get(`${fastAPIURL}/anime/edit/${request_anime_id}`)
            .then(response => {
                setRequestAnime(response.data);
                setLoading(false);
            })
            .catch(() => {
                setError("問い合わせ情報取得中にエラーが発生しました");
                setLoading(false);
            });
    }, [request_anime_id]);

    return { requestAnime, loading, error };
};