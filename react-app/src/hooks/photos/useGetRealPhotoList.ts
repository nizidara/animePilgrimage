import { useEffect, useState } from "react"
import axios from "axios";
import { fastAPIURL } from "../../properties/properties";
import { responseRealPhotoData } from "../../type/api/photo";

export const useGetRealPhotoList = (place_id: string | null) => {
  const [realPhotoList, setRealPhotoList] = useState<responseRealPhotoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const url = fastAPIURL;

  useEffect(() => {
    if(place_id){
        axios.get(url + "/photos/reals/list/" + place_id)
        .then(response => {
            setRealPhotoList(response.data);
            setLoading(false);
        })
        .catch(error => {
            setError(error.message);
            setLoading(false);
        });
    }
  }, []);

  return { realPhotoList, loading, error };
};