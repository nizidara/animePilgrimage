import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { editAdminPlaceData, responsePlaceData } from "../../type/api/place";
import { registerPlaceFormData } from "../../type/form/place";
import api from "../../api/axiosInstance";

//put palce direct
export const useAdminEditPlace = () => {
    const [responseData, setResponseData] = useState<responsePlaceData | null>(null);
    const navigation = useNavigate();

    //put
    const edit = useCallback((formData : registerPlaceFormData, placeId: string, createdUserId?: string | null) => {
        const {images, icon_index, ...rest} = formData
        const registerData : editAdminPlaceData = {
            ...rest,
            flag: 1, //display only
            created_user_id: createdUserId,  //now null only
            edited_user_id: null    //null only(admin)
        }

        api.put(`/places/edit/admin/${placeId}`, registerData).then((res) => {
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