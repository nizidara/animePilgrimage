import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import api from "../../api/axiosInstance";

//deleteContact
export const useAdminDeleteContact = () => {
    const [responseData, setResponseData] = useState<any | null>(null);
    const [deleteError, setDeleteError] = useState<string | null>(null);
    const navigation = useNavigate();

    //delete
    const deleteContact = useCallback((contactId: number | string) => {
        setDeleteError(null);

        api.delete(`/contacts/${contactId}`)
        .then((res) => {
            setResponseData(res.data);
        })
        .catch(() => {
            setDeleteError("問い合わせ情報削除中にエラーが発生しました")
        })
    }, [setResponseData])

    // responseがnullで無ければ一覧ページに遷移（要修正：完了ページ）
    useEffect(() => {
        if(responseData!== null){
            navigation(`/admin/contact/list`)
        }
    }, [responseData, navigation])

    return {deleteContact, deleteError};
}