import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { responseAnimeData } from "../../type/api/anime";
import api from "../../api/axiosInstance";

//put anime direct
export const useAdminUpdateAnimeFlag = () => {
    const [responseData, setResponseData] = useState<responseAnimeData | null>(null);
    const [updateError, setUpdateError] = useState<string | null>(null);
    const navigation = useNavigate();

    //put
    const updateFlag = useCallback((animeId: number, flag: number, onAnimeDataUpdated : () => void) => {
        setUpdateError(null);

        api.put(`/anime/${animeId}?flag=${flag}`)
        .then((res) => {
            setResponseData(res.data);
            onAnimeDataUpdated();
        })
        .catch(() => {
            setUpdateError("フラグ更新中にエラーが発生しました")
        })
    }, [setResponseData])

    // responseがnullで無ければ完了ページに遷移
    useEffect(() => {
        if(responseData!== null){
            navigation(`/admin/anime?anime_id=${responseData.anime_id}`, {state: {responseData}})
        }
    }, [responseData, navigation])

    return {updateFlag, updateError};
}