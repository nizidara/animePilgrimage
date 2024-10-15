import { useEffect, useState } from "react"
import axios from "axios";
import { fastAPIURL } from "../../properties/properties";
import { responseAnimeData } from "../../type/api/anime";

export const useGetAnimeList = () => {
    const [animeList, setAnimeList] = useState<responseAnimeData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const url = fastAPIURL;

    useEffect(() => {
        axios.get(url + "/anime/list/search")
        .then(response => {
            setAnimeList(response.data);
            setLoading(false);
        })
        .catch(error => {
            setError(error.message);
            setLoading(false);
        });
    }, []);

    return { animeList, loading, error };
};