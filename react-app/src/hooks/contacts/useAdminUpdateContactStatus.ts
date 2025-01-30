import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import api from "../../api/axiosInstance";
import { responseContactData } from "../../type/api/contact";

//update contact flag
export const useAdminUpdateContactFlag = () => {
    const [responseData, setResponseData] = useState<responseContactData | null>(null);
    const [updateError, setUpdateError] = useState<string | null>(null);
    const navigation = useNavigate();

    //put
    const updateFlag = useCallback((contactId: number, status: number, onContactDataUpdated : () => void) => {
        setUpdateError(null);

        api.put(`/contacts/${contactId}?status=${status}`)
        .then((res) => {
            setResponseData(res.data);
            onContactDataUpdated();
        })
        .catch(() => {
            setUpdateError("フラグ更新中にエラーが発生しました")
        })
    }, [setResponseData])

    // responseがnullで無ければ完了ページに遷移
    useEffect(() => {
        if(responseData!== null){
            navigation(`/admin/contact?contact_id=${responseData.contact_id}`, {state: {responseData}})
        }
    }, [responseData, navigation])

    return {updateFlag, updateError};
}