import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"
import { fastAPIURL } from "../../properties/properties";
import { requestPlaceData, responsePlaceData, responseRequestPlaceData } from "../../type/api/place";
import { deletePlaceFormData } from "../../type/form/place";
import { useAuth } from "../../providers/AuthContext";

//post place request
export const useDeleteRequestPlace = () => {
    const [responseData, setResponseData] = useState<responseRequestPlaceData | null>(null);
    const [deleteRequestError, setDeleteRequestError] = useState<string | null>(null);
    const placeIconRef = useRef<string | null>(null);
    const navigation = useNavigate();
    const {user} = useAuth();

    //post
    const deleteRequest = useCallback((formData : deletePlaceFormData, place: responsePlaceData) => {
        setDeleteRequestError(null);

        const deleteData : requestPlaceData = {
            ...formData,
            ...place,
            request_type: 1,    //delete request only
            user_id: user ? user.user_id : null
        }

        if (place.place_icon) {
            placeIconRef.current = place.place_icon;
        }

        axios.post(`${fastAPIURL}/places/request`, deleteData)
        .then((res) => {
            setResponseData(res.data);
        })
        .catch(() => {
            setDeleteRequestError("送信中にエラーが発生しました");
        })
    }, [setResponseData, user])

    // responseがnullで無ければ完了ページに遷移
    useEffect(() => {
        if(responseData!== null){
            navigation("/delete_place/complete", { state: { responseData, placeIcon: placeIconRef.current }, replace: true })
        }
    }, [responseData, navigation])

    return { deleteRequest, deleteRequestError };
}