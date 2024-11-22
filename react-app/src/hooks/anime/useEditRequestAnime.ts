import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { fastAPIURL } from "../../properties/properties";
import { editAnimeData, responseEditAnimeData } from "../../type/api/anime";
import { editAnimeFormData } from "../../type/form/anime";

//post anime
export const useEditRequestAnime = () => {
    const [responseData, setResponseData] = useState<responseEditAnimeData | null>(null);
    const navigation = useNavigate();

    //post
    const edit = useCallback((animeData : editAnimeFormData, animeId : number) => {
        const editData : editAnimeData = {
            ...animeData,
            anime_id: animeId,
            request_date: new Date().toISOString(),
            request_type: 0,    //edit request only
            //現時点ではuser_idはnull限定
            user_id: null
        }

        const formData = new FormData();

        Object.keys(editData).forEach((key) => {
            const value = (editData as any)[key];
            if (value !== null && value !== undefined) {
                formData.append(key, value);
            }
        });

        axios.post(`${fastAPIURL}/anime/edit`, formData).then((res) => {
            setResponseData(res.data);
        })
    }, [setResponseData])

    // responseがnullで無ければ完了ページに遷移
    useEffect(() => {
        if(responseData!== null){
            navigation("/edit_anime/complete", { state: { responseData }, replace: true })
        }
    }, [responseData, navigation])

    return {edit};
}