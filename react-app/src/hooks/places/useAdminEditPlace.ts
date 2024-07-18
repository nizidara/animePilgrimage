import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { fastAPIURL } from "../../properties/properties";
import { registerPlaceData, responsePlaceData } from "../../type/api/place";
import { registerPlaceFormData } from "../../type/form/place";

//put palce direct
export const useAdminEditPlace = () => {
    const [responseData, setResponseData] = useState<responsePlaceData | null>(null);
    const navigation = useNavigate();
    const url = fastAPIURL;

    //put
    const edit = useCallback((formData : registerPlaceFormData, placeId: string, createdUserId?: string | null) => {
        const registerData : registerPlaceData = {
            ...formData,
            flag: 1, //display only
            created_user_id: createdUserId,  //now null only
            edited_user_id: null    //null only(admin)
        }

        axios.put(url + `/places/edit/admin/${placeId}`, registerData).then((res) => {
            setResponseData(res.data);
        })
    }, [setResponseData])

    // responseがnullで無ければ完了ページに遷移
    useEffect(() => {
        if(responseData!== null){
            navigation(`/admin/place?place_id=${responseData.place_id}`, {state: {responseData}})
        }
    }, [responseData, navigation])

    return {edit};
}