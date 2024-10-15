import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { fastAPIURL } from "../../properties/properties";
import { requestPlaceData, responsePlaceData, responseRequestPlaceData } from "../../type/api/place";
import { deletePlaceFormData } from "../../type/form/place";

//post place request
export const useDeleteRequestPlace = () => {
    const [responseData, setResponseData] = useState<responseRequestPlaceData | null>(null);
    const [placeIcon, setPlaceIcon] = useState<string | null>(null);
    const navigation = useNavigate();
    const url = fastAPIURL;

    //post
    const deleteRequest = useCallback((formData : deletePlaceFormData, place: responsePlaceData) => {
        const deleteData : requestPlaceData = {
            ...formData,
            ...place,
            request_date: new Date().toISOString(),
            request_type: 1,    //delete request only
            user_id: null   //now null only
        }

        place.place_icon && setPlaceIcon(place.place_icon);

        axios.post(url + "/places/request", deleteData).then((res) => {
            setResponseData(res.data);
        })
    }, [setResponseData])

    // responseがnullで無ければ完了ページに遷移
    useEffect(() => {
        if(responseData!== null){
            navigation("/delete_place/complete", {state: {responseData, placeIcon}})
        }
    }, [responseData, navigation])

    return {deleteRequest};
}