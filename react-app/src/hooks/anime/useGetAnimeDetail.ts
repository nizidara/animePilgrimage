import { useCallback, useEffect, useState } from "react"
import axios from "axios";
import { fastAPIURL } from "../../properties/properties";
import { responseAnimeData } from "../../type/api/anime";
import api from "../../api/axiosInstance";

export const useGetAnimeDetail = (anime_id: string | number | null) => {
    const [anime, setAnime] = useState<responseAnimeData>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAnimeDetail = useCallback(() => {
        if(anime_id){
            //not auth
            axios.get(`${fastAPIURL}/anime/detail/${anime_id}`)
            .then(response => {
                setAnime(response.data);
            }).catch((err) =>{
                //anime.flag == 1
                if(err.response.status === 401){
                    api.get(`${fastAPIURL}/anime/detail/${anime_id}`)
                    .then(response => {
                        setAnime(response.data);
                    })
                    .catch(() => {
                        setError("この作品は現在は利用できません。");
                    })
                }else{
                    setError("アニメ情報取得中にエラーが発生しました");
                }
            })
            .finally(() =>{
                setLoading(false);
            })
        }
    }, [anime_id]);

    useEffect(() => {
        fetchAnimeDetail();
    }, [fetchAnimeDetail])

    return { anime, loading, error, fetchAnimeDetail };
};