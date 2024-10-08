import { useEffect, useState } from "react"
import axios from "axios";
import { fastAPIURL } from "../../properties/properties";
import { responseAnimePhotoData } from "../../type/api/photo";

export const useGetAnimePhotoList = (place_id: string | null) => {
    const [animePhotoList, setAnimePhotoList] = useState<responseAnimePhotoData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const url = fastAPIURL;

    const fetchAnimePhotos = () => {
        if(place_id){
            axios.get(url + "/photos/anime/list/" + place_id)
            .then(response => {
                setAnimePhotoList(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
        }
    };

    useEffect(() => {
        fetchAnimePhotos();
    }, [place_id])

  return { animePhotoList, loading, error, fetchAnimePhotos };
};