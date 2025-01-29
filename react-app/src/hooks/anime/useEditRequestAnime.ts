import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { fastAPIURL } from "../../properties/properties";
import { editAnimeData, responseEditAnimeData } from "../../type/api/anime";
import { editAnimeFormData } from "../../type/form/anime";
import { useAuth } from "../../providers/AuthContext";

//post request anime
export const useEditRequestAnime = () => {
    const [responseData, setResponseData] = useState<responseEditAnimeData | null>(null);
    const [editError, setEditError] = useState<string | null>(null);
    const navigation = useNavigate();
    const {user} = useAuth();

    //post
    const edit = useCallback((animeData : editAnimeFormData, animeId : number) => {
        setEditError(null);
        
        const editData : editAnimeData = {
            ...animeData,
            anime_id: animeId,
            request_type: 0,    //edit request only
            user_id: user ? user.user_id : null
        }

        const formData = new FormData();

        Object.keys(editData).forEach((key) => {
            const value = (editData as any)[key];
            if (value !== null && value !== undefined) {
                formData.append(key, value);
            }
        });

        axios.post(`${fastAPIURL}/anime/edit`, formData)
        .then((res) => {
            setResponseData(res.data);
        })
        .catch(() => {
            setEditError("送信中にエラーが発生しました")
        })
    }, [setResponseData, user])

    // responseがnullで無ければ完了ページに遷移
    useEffect(() => {
        if(responseData!== null){
            navigation("/edit_anime/complete", { state: { responseData }, replace: true })
        }
    }, [responseData, navigation])

    return {edit, editError};
}