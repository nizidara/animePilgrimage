import { useEffect, useState } from "react"
import axios from "axios";
import { fastAPIURL } from "../../properties/properties";
import { responsePlaceIconData } from "../../type/api/photo";

export const useGetPlaceIcon = (place_id: string | null) => {
  const [placeIcon, setPlaceIcon] = useState<responsePlaceIconData>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const url = fastAPIURL;

  useEffect(() => {
    if(place_id){
        axios.get(url + "/photos/places/icons/" + place_id)
        .then(response => {
            setPlaceIcon(response.data);
            setLoading(false);
        })
        .catch(error => {
            setError(error.message);
            setLoading(false);
        });
    }
  }, []);

  return { placeIcon, loading, error };
};