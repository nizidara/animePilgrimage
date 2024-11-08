import { useCallback, useEffect, useState } from "react"
import axios from "axios";
import { fastAPIURL } from "../../properties/properties";
import { responseAnimePhotoData } from "../../type/api/photo";

export const useGetAnimePhotoList = (place_id: string | null) => {
    const [animePhotoList, setAnimePhotoList] = useState<responseAnimePhotoData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAnimePhotos = useCallback(() => {
        if(place_id){
            axios.get(`${fastAPIURL}/photos/anime/list/${place_id}`)
            .then(response => {
                setAnimePhotoList(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
        }
    }, [place_id]);

    useEffect(() => {
        fetchAnimePhotos();
    }, [fetchAnimePhotos])

  return { animePhotoList, loading, error, fetchAnimePhotos };
};