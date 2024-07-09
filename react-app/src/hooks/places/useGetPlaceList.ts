import { useEffect, useState } from "react"
import axios from "axios";
import { fastAPIURL } from "../../properties/properties";
import { responsePlaceData } from "../../type/api/place";

export const useGetPlaceList = () => {
  const [placeList, setPlaceList] = useState<responsePlaceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const url = fastAPIURL;

  useEffect(() => {
    axios.get(url + "/places/list/search")
      .then(response => {
        setPlaceList(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return { placeList, loading, error };
};