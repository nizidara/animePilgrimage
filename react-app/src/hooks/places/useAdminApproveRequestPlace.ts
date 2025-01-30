import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import api from "../../api/axiosInstance";
import { responsePlaceData } from "../../type/api/place";

//put approve request place
export const useAdminApproveRequestPlace = () => {
    const [responseData, setResponseData] = useState<responsePlaceData | null>(null);
    const [approveError, setApproveError] = useState<string | null>(null);
    const navigation = useNavigate();

    //put
    const approve = useCallback((requestPlaceId: string) => {
        setApproveError(null);

        api.put(`/places/edit/${requestPlaceId}`)
        .then((res) => {
            setResponseData(res.data);
        })
        .catch(() => {
            setApproveError("承認中にエラーが発生しました")
        })
    }, [setResponseData])

    // responseがnullで無ければ聖地ページに遷移（要修正：完了ページ）
    useEffect(() => {
        if(responseData!== null){
            navigation(`/admin/place?place_id=${responseData.place_id}`, {state: {responseData}})
        }
    }, [responseData, navigation])

    return {approve, approveError};
}