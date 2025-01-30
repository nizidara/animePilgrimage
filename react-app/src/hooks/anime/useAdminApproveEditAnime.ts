import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { responseAnimeData } from "../../type/api/anime";
import api from "../../api/axiosInstance";

//put approve request anime
export const useAdminApproveEditAnime = () => {
    const [responseData, setResponseData] = useState<responseAnimeData | null>(null);
    const [approveError, setApproveError] = useState<string | null>(null);
    const navigation = useNavigate();

    //put
    const approve = useCallback((requestAnimeId: number | string) => {
        setApproveError(null);

        api.put(`/anime/edit/${requestAnimeId}`)
        .then((res) => {
            setResponseData(res.data);
        })
        .catch(() => {
            setApproveError("承認中にエラーが発生しました")
        })
    }, [setResponseData])

    // responseがnullで無ければアニメページに遷移（要修正：完了ページ）
    useEffect(() => {
        if(responseData!== null){
            navigation(`/admin/anime?anime_id=${responseData.anime_id}`, {state: {responseData}})
        }
    }, [responseData, navigation])

    return {approve, approveError};
}