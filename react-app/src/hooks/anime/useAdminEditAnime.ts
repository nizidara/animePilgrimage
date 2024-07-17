import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { fastAPIURL } from "../../properties/properties";
import { registerAnimeData, responseAnimeData } from "../../type/api/anime";
import { registerAnimeFormData } from "../../type/form/anime";

//put anime direct
export const useAdminEditAnime = () => {
    const [responseData, setResponseData] = useState<responseAnimeData | null>(null);
    const navigation = useNavigate();
    const url = fastAPIURL;

    //put
    const edit = useCallback((formData : registerAnimeFormData, animeId: string) => {
        const registerData : registerAnimeData = {
            ...formData,
            flag: 1
        }

        axios.put(url + `/anime/edit/admin/${animeId}`, registerData).then((res) => {
            setResponseData(res.data);
        })
    }, [setResponseData])

    // responseがnullで無ければ完了ページに遷移
    useEffect(() => {
        if(responseData!== null){
            navigation(`/admin/anime?anime_id=${responseData.anime_id}`, {state: {responseData}})
        }
    }, [responseData, navigation])

    return {edit};
}