import { useEffect, useState } from "react"
import axios from "axios";
import { fastAPIURL } from "../../properties/properties";
import { responseRegionData } from "../../type/api/region";

export const useGetRegionDetail = (region_id: number) => {
    const [region, setRegion] = useState<responseRegionData>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.get(`${fastAPIURL}/regions/detail/${region_id}`)
        .then(response => {
            setRegion(response.data);
            setLoading(false);
        })
        .catch(() => {
            setError("都道府県情報取得中にエラーが発生しました");
            setLoading(false);
        });
    }, [region_id]);

    return { region, loading, error };
};