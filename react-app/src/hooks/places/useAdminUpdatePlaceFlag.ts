import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import api from "../../api/axiosInstance";
import { responsePlaceData } from "../../type/api/place";

//put update place flag
export const useAdminUpdatePlaceFlag = () => {
    const [responseData, setResponseData] = useState<responsePlaceData | null>(null);
    const [updateError, setUpdateError] = useState<string | null>(null);
    const navigation = useNavigate();

    //put
    const updateFlag = useCallback((placeId: string, flag: number, onPlaceDataUpdated : () => void) => {
        setUpdateError(null);

        api.put(`/places/${placeId}?flag=${flag}`)
        .then((res) => {
            setResponseData(res.data);
            onPlaceDataUpdated();
        })
        .catch(() => {
            setUpdateError("フラグ更新中にエラーが発生しました")
        })
    }, [setResponseData])

    // responseがnullで無ければ完了ページに遷移
    useEffect(() => {
        if(responseData!== null){
            navigation(`/admin/place?place_id=${responseData.place_id}`, {state: {responseData}})
        }
    }, [responseData, navigation])

    return {updateFlag, updateError};
}