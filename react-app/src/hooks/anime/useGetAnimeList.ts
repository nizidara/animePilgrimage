import { useEffect, useState } from "react"
import axios from "axios";
import { fastAPIURL } from "../../properties/properties";
import { responseAnimeData } from "../../type/api/anime";

export const useGetAnimeList = () => {
    const [animeList, setAnimeList] = useState<responseAnimeData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.get(`${fastAPIURL}/anime/list/search`)
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