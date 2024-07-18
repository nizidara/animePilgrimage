import { useEffect, useState } from "react"
import axios from "axios";
import { fastAPIURL } from "../../properties/properties";
import { responseRegionData } from "../../type/api/region";

export const useGetRegionList = () => {
  const [regionList, setRegionList] = useState<responseRegionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const url = fastAPIURL;

  useEffect(() => {
    axios.get(url + "/regions/list")
      .then(response => {
        setRegionList(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return { regionList, loading, error };
};