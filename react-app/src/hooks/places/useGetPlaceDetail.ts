import { useEffect, useState } from "react"
import axios from "axios";
import { fastAPIURL } from "../../properties/properties";
import { responsePlaceData } from "../../type/api/place";

export const useGetPlaceDetail = (place_id: string | null) => {
    const [place, setPlace] = useState<responsePlaceData>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const url = fastAPIURL;

    useEffect(() => {
        axios.get(url + "/places/detail/" + place_id)
        .then(response => {
            setPlace(response.data);
            setLoading(false);
        })
        .catch(error => {
            setError(error.message);
            setLoading(false);
        });
    }, [place_id]);

    return { place, loading, error };
};