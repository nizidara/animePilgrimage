import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"
import { fastAPIURL } from "../../properties/properties";
import { editPlaceFormData } from "../../type/form/place";
import { requestPlaceData, responseRequestPlaceData } from "../../type/api/place";

//post place request
export const useEditRequestPlace = () => {
    const [responseData, setResponseData] = useState<responseRequestPlaceData | null>(null);
    const animePhotoRef = useRef<string[]>([]);
    const navigation = useNavigate();

    //post
    const edit = useCallback((formData : editPlaceFormData, placeId: string, animePhoto: string[]) => {
        const editData : requestPlaceData = {
            ...formData,
            place_id: placeId,
            request_date: new Date().toISOString(),
            request_type: 0,    //edit request only
            user_id: null   //now null only
        }

        animePhotoRef.current = animePhoto;

        axios.post(`${fastAPIURL}/places/request`, editData).then((res) => {
            setResponseData(res.data);
        })
    }, [setResponseData])

    // responseがnullで無ければ完了ページに遷移
    useEffect(() => {
        if(responseData!== null){
            navigation("/edit_place/complete", {state: {responseData, animePhoto: animePhotoRef.current}})
        }
    }, [responseData, navigation])

    return {edit};
}