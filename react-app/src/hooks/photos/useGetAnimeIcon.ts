import { useEffect, useState } from "react"
import axios from "axios";
import { fastAPIURL } from "../../properties/properties";
import { responseAnimeIconData } from "../../type/api/photo";

export const useGetAnimeIcon = (anime_id: number | string | null) => {
    const [animeIcon, setAnimeIcon] = useState<responseAnimeIconData>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const url = fastAPIURL;

    useEffect(() => {
        if(anime_id){
            axios.get(url + "/photos/anime/icons/" + anime_id)
            .then(response => {
                setAnimeIcon(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
        }
    }, [anime_id]);

    return { animeIcon, loading, error };
};