import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { fastAPIURL } from "../../properties/properties";
import { responsePlaceIconData, updatePlaceIconData } from "../../type/api/photo";

//update place icon
export const useUpdatePlaceIcon = () => {
    const [responseData, setResponseData] = useState<responsePlaceIconData | null>(null);
    const navigation = useNavigate();
    const url = fastAPIURL;

    //update
    const update = useCallback((anime_photo_id: string, onPlaceIconUpdated: () => void, place_id?: string | null) => {
        const postData : updatePlaceIconData = {
            anime_photo_id: anime_photo_id,
            place_id: place_id
        }

        axios.put(url + "/photos/places/icons", postData).then((res) => {
            setResponseData(res.data);
            onPlaceIconUpdated();
        })
    }, [setResponseData])

    // responseがnullで無ければ完了ページに遷移
    useEffect(() => {
        if(responseData!== null){
            const placeId = responseData.place_id;
            navigation("/place/photo", {state: {placeId}});
        }
    }, [responseData, navigation])

    return {update};
}