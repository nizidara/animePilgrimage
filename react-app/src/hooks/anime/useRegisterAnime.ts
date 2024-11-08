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

    //post
    const register = useCallback((animeData : registerAnimeFormData) => {
        const registerData : registerAnimeData = {
            ...animeData,
            flag: 2 //waiting approval only
        }

        const formData = new FormData();

        Object.keys(registerData).forEach((key) => {
            const value = (registerData as any)[key];
            if (value !== null && value !== undefined) {
                formData.append(key, value);
            }
        });

        axios.post(`${fastAPIURL}/anime`, formData).then((res) => {
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