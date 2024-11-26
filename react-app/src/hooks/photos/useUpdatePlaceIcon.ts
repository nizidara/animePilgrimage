import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { fastAPIURL } from "../../properties/properties";
import { responsePlaceIconData, updatePlaceIconData } from "../../type/api/photo";

//update place icon
export const useUpdatePlaceIcon = (isAdmin:boolean) => {
    const [responseData, setResponseData] = useState<responsePlaceIconData | null>(null);
    const [updateError, setUpdateError] = useState<string | null>(null);
    const navigation = useNavigate();

    //update
    const update = useCallback((anime_photo_id: string, onPlaceIconUpdated: () => void, place_id?: string | null) => {
        setUpdateError(null);

        const postData : updatePlaceIconData = {
            anime_photo_id: anime_photo_id,
            place_id: place_id
        }

        axios.put(`${fastAPIURL}/photos/places/icons`, postData)
        .then((res) => {
            setResponseData(res.data);
            onPlaceIconUpdated();
        })
        .catch(() => {
            setUpdateError("更新中にエラーが発生しました");
        })
    }, [setResponseData])

    // responseがnullで無ければ完了ページに遷移
    useEffect(() => {
        if(responseData!== null){
            const placeId = responseData.place_id;
            isAdmin ? navigation(`/admin/place?place_id=${placeId}`) : navigation("/place/photo", {state: {placeId}});
        }
    }, [responseData, navigation, isAdmin])

    return { update, updateError };
}