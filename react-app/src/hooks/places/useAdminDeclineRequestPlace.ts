import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import api from "../../api/axiosInstance";

//decline request place
export const useAdminDeclineRequestPlace = () => {
    const [responseData, setResponseData] = useState<any | null>(null);
    const [declineError, setDeclineError] = useState<string | null>(null);
    const navigation = useNavigate();

    //delete
    const decline = useCallback((requestPlaceId: string) => {
        setDeclineError(null);

        api.delete(`/places/request/${requestPlaceId}`)
        .then((res) => {
            setResponseData(res.data);
        })
        .catch(() => {
            setDeclineError("問い合わせ情報削除中にエラーが発生しました")
        })
    }, [setResponseData])

    // responseがnullで無ければ一覧ページに遷移（要修正：完了ページ）
    useEffect(() => {
        if(responseData!== null){
            navigation(`/admin/request_place/list`)
        }
    }, [responseData, navigation])

    return {decline, declineError};
}