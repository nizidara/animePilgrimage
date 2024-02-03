import axios from "axios";
import { useCallback, useState } from "react";
import { Data } from "../type/api/fastAPITest";
import { fastAPIURL } from "../properties/properties";

export const useFastAPITest = () => {
    const [data, setData] = useState<Data>();
    const url = fastAPIURL;
    
    const GetData = useCallback((id : string) => {
        axios.get(url + "/" + id).then((res) => {
            setData(res.data);
        });
    },[setData]);
    return {GetData, data}
}