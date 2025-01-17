import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { editAdminPlaceData, responsePlaceData } from "../../type/api/place";
import { registerPlaceFormData } from "../../type/form/place";
import api from "../../api/axiosInstance";
import { useAuth } from "../../providers/AuthContext";

//put palce direct
export const useAdminEditPlace = () => {
    const [responseData, setResponseData] = useState<responsePlaceData | null>(null);
    const [editError, setEditError] = useState<string | null>(null);
    const navigation = useNavigate();
    const {user} = useAuth();

    //put
    const edit = useCallback((formData : registerPlaceFormData, placeId: string, createdUserId?: string | null) => {
        setEditError(null);

        const {images, icon_index, ...rest} = formData
        const registerData : editAdminPlaceData = {
            ...rest,
            flag: 1, //display only
            created_user_id: createdUserId,
            edited_user_id: user ? user.user_id : null
        }

        api.put(`/places/edit/admin/${placeId}`, registerData)
        .then((res) => {
            setResponseData(res.data);
        })
        .catch(() => {
            setEditError("投稿中にエラーが発生しました");
        })
    }, [setResponseData])

    // responseがnullで無ければ完了ページに遷移
    useEffect(() => {
        if(responseData!== null){
            navigation(`/admin/place?place_id=${responseData.place_id}`, {state: {responseData}})
        }
    }, [responseData, navigation])

    return { edit, editError };
}