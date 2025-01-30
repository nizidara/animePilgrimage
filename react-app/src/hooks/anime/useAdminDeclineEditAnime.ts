import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import api from "../../api/axiosInstance";

//decline request anime
export const useAdminDeclineEditAnime = () => {
    const [responseData, setResponseData] = useState<any | null>(null);
    const [declineError, setDeclineError] = useState<string | null>(null);
    const navigation = useNavigate();

    //put
    const decline = useCallback((requestAnimeId: number | string) => {
        setDeclineError(null);

        api.delete(`/anime/edit/${requestAnimeId}`)
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
            navigation(`/admin/request_anime/list`)
        }
    }, [responseData, navigation])

    return {decline, declineError};
}