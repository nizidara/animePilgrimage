import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { registerAnimeData, responseAnimeData } from "../../type/api/anime";
import { registerAnimeFormData } from "../../type/form/anime";
import api from "../../api/axiosInstance";

//put anime direct
export const useAdminEditAnime = () => {
    const [responseData, setResponseData] = useState<responseAnimeData | null>(null);
    const navigation = useNavigate();

    //put
    const edit = useCallback((animeData : registerAnimeFormData, onAnimeDataUpdated : () => void, animeId: string) => {
        const registerData : registerAnimeData = {
            ...animeData,
            flag: 1
        }

        const formData = new FormData();

        Object.keys(registerData).forEach((key) => {
            const value = (registerData as any)[key];
            if (value !== null && value !== undefined) {
                formData.append(key, value);
            }
        });

        api.put(`/anime/edit/admin/${animeId}`, formData).then((res) => {
            setResponseData(res.data);
            onAnimeDataUpdated();
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