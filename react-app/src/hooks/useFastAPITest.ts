import axios from "axios";
import { useCallback, useState } from "react";
import { Data } from "../type/api/fastAPITest";

export const useFastAPITest = () => {
    const [data, setData] = useState<Data>();
    const url = "http://127.0.0.1:8000";
    
    const GetData = useCallback((id : string) => {
        axios.get(url + "/" + id).then((res) => {
            setData(res.data);
        });
    },[setData]);
    return {GetData, data}
}