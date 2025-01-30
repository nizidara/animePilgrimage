import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import api from "../../api/axiosInstance";

//decline report comment
export const useAdminDeclineReportComment = () => {
    const [responseData, setResponseData] = useState<any | null>(null);
    const [declineError, setDeclineError] = useState<string | null>(null);
    const navigation = useNavigate();

    //delete
    const decline = useCallback((deleteCommentId: number | string) => {
        setDeclineError(null);

        api.delete(`/comments/report/${deleteCommentId}`)
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
            navigation(`/admin/report_comment/list`)
        }
    }, [responseData, navigation])

    return {decline, declineError};
}