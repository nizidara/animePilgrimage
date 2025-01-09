import { useEffect, useState } from "react"
import { fastAPIURL } from "../../properties/properties";
import { responseAnimeData } from "../../type/api/anime";
import api from "../../api/axiosInstance";

export const useAdminGetAnimeList = () => {
    const [animeList, setAnimeList] = useState<responseAnimeData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        api.get(`${fastAPIURL}/anime/list/admin`)
            .then(response => {
                setAnimeList(response.data);
                setLoading(false);
            })
            .catch(() => {
                setError("アニメ情報取得中にエラーが発生しました");
                setLoading(false);
            });
    }, []);

    return { animeList, loading, error };
};