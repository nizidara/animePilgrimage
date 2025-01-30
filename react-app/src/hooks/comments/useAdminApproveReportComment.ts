import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { responseAnimeData } from "../../type/api/anime";
import api from "../../api/axiosInstance";

//put approve report comment
export const useAdminApproveReportComment = () => {
    const [responseData, setResponseData] = useState<responseAnimeData | null>(null);
    const [approveError, setApproveError] = useState<string | null>(null);
    const navigation = useNavigate();

    //put
    const approve = useCallback((deleteCommentId: number | string) => {
        setApproveError(null);

        api.put(`/comments/report/${deleteCommentId}`)
        .then((res) => {
            setResponseData(res.data);
        })
        .catch(() => {
            setApproveError("承認中にエラーが発生しました")
        })
    }, [setResponseData])

    // responseがnullで無ければ一覧に遷移（要修正：完了ページ）
    useEffect(() => {
        if(responseData!== null){
            navigation(`/admin/report_comment/list`)
        }
    }, [responseData, navigation])

    return {approve, approveError};
}