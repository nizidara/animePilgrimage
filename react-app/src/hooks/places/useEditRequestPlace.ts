import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"
import { fastAPIURL } from "../../properties/properties";
import { editPlaceFormData } from "../../type/form/place";
import { requestPlaceData, responseRequestPlaceData } from "../../type/api/place";
import { useAuth } from "../../providers/AuthContext";

//post place request
export const useEditRequestPlace = () => {
    const [responseData, setResponseData] = useState<responseRequestPlaceData | null>(null);
    const [editError, setEditError] = useState<string | null>(null);
    const animePhotoRef = useRef<string[]>([]);
    const navigation = useNavigate();
    const {user} = useAuth();

    //post
    const edit = useCallback((formData : editPlaceFormData, placeId: string, animePhoto: string[]) => {
        setEditError(null);

        const editData : requestPlaceData = {
            ...formData,
            place_id: placeId,
            request_type: 0,    //edit request only
            user_id: user ? user.user_id : null
        }

        animePhotoRef.current = animePhoto;

        axios.post(`${fastAPIURL}/places/request`, editData)
        .then((res) => {
            setResponseData(res.data);
        })
        .catch(() => {
            setEditError("送信中にエラーが発生しました");
        })
    }, [setResponseData, user])

    // responseがnullで無ければ完了ページに遷移
    useEffect(() => {
        if(responseData!== null){
            navigation("/edit_place/complete", { state: { responseData, animePhoto: animePhotoRef.current }, replace: true })
        }
    }, [responseData, navigation])

    return { edit, editError };
}