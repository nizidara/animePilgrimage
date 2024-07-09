import { useEffect, useState } from "react"
import axios from "axios";
import { fastAPIURL } from "../../properties/properties";
import { responseAnimeData } from "../../type/api/anime";

export const useGetAnimeDetail = (anime_id: string | null) => {
  const [anime, setAnime] = useState<responseAnimeData>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const url = fastAPIURL;

  useEffect(() => {
    if(anime_id){
        axios.get(url + "/anime/detail/" + anime_id)
      .then(response => {
        setAnime(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
    }
    
  }, []);

  return { anime, loading, error };
};