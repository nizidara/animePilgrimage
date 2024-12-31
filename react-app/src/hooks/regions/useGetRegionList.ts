import { useEffect, useState } from "react"
import axios from "axios";
import { fastAPIURL } from "../../properties/properties";
import { responseRegionData } from "../../type/api/region";

export const useGetRegionList = () => {
    const [regionList, setRegionList] = useState<responseRegionData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.get(`${fastAPIURL}/regions/list`)
        .then(response => {
            setRegionList(response.data);
            setLoading(false);
        })
        .catch(error => {
            setError("都道府県情報取得中にエラーが発生しました");
            setLoading(false);
        });
    }, []);

    return { regionList, loading, error };
};