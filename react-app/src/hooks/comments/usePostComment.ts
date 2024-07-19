import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { fastAPIURL } from "../../properties/properties";
import { postCommentFormData } from "../../type/form/comment";
import { postCommentData, responseCommentData } from "../../type/api/comment";

//post comment
export const usePostComment = () => {
    const [responseData, setResponseData] = useState<responseCommentData | null>(null);
    const navigation = useNavigate();
    const url = fastAPIURL;

    //post
    const post = useCallback((formData : postCommentFormData, placeId : string) => {
        const postData : postCommentData = {
            ...formData,
            comment_date: new Date().toISOString(),
            range_id: 0,    //now 0(public) only
            place_id: placeId,
            // now null olny
            user_id: null
        }

        axios.post(url + "/comments/", postData).then((res) => {
            setResponseData(res.data);
        })
    }, [setResponseData])

    // responseがnullで無ければ完了ページに遷移
    useEffect(() => {
        if(responseData!== null){
            navigation(`/place?place_id=${responseData.place_id}`)
        }
    }, [responseData, navigation])

    return {post};
}