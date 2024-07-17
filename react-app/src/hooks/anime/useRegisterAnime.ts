import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { fastAPIURL } from "../../properties/properties";
import { registerAnimeData, responseAnimeData } from "../../type/api/anime";
import { registerAnimeFormData } from "../../type/form/anime";

//post anime
export const useRegisterAnime = () => {
    const [responseData, setResponseData] = useState<responseAnimeData | null>(null);
    const navigation = useNavigate();
    const url = fastAPIURL;

    //post
    const register = useCallback((formData : registerAnimeFormData) => {
        const registerData : registerAnimeData = {
            ...formData,
            flag: 2 //waiting approval only
        }

        axios.post(url + "/anime", registerData).then((res) => {
            setResponseData(res.data);
        })
    }, [setResponseData])

    // responseがnullで無ければ完了ページに遷移
    useEffect(() => {
        if(responseData!== null){
            navigation("/register_anime/complete", {state: {responseData}})
        }
    }, [responseData, navigation])

    return {register};
}