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
    const url = fastAPIURL;

    //post
    const edit = useCallback((formData : editAnimeFormData, animeId : number) => {
        const editData : editAnimeData = {
            ...formData,
            anime_id: animeId,
            request_date: new Date().toISOString(),
            request_type: 0,    //edit request only
            //現時点ではuser_idはnull限定
            user_id: null
        }

        axios.post(url + "/anime/edit", editData).then((res) => {
            setResponseData(res.data);
        })
    }, [setResponseData])

    // responseがnullで無ければ完了ページに遷移
    useEffect(() => {
        if(responseData!== null){
            navigation("/edit_anime/complete", {state: {responseData}})
        }
    }, [responseData, navigation])

    return {edit};
}