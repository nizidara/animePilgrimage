import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { fastAPIURL } from "../../properties/properties";
import { deleteCommentData, responseDeleteCommentData } from "../../type/api/comment";
import { deleteCommentFormData } from "../../type/form/comment";
import { useAuth } from "../../providers/AuthContext";

//post delete request comment
export const useDeleteRequestComment = () => {
    const [responseData, setResponseData] = useState<responseDeleteCommentData | null>(null);
    const [requestError, setRequestError] = useState<string | null>(null);
    const navigation = useNavigate();
    const {user} = useAuth();

    //post
    const request = useCallback((formData : deleteCommentFormData, commentId : string) => {
        setRequestError(null);
        
        const postData : deleteCommentData = {
            ...formData,
            comment_id: commentId,
            request_date: new Date().toISOString(),
            user_id: user ? user.user_id : null
        }

        axios.post(`${fastAPIURL}/comments/report`, postData)
        .then((res) => {
            setResponseData(res.data);
        })
        .catch(() => {
            setRequestError("送信中にエラーが発生しました")
        })
    }, [setResponseData, user])

    // responseがnullで無ければ完了ページに遷移
    useEffect(() => {
        if(responseData!== null){
            navigation("/delete_comment/complete", {state: {responseData}})
        }
    }, [responseData, navigation])

    return {request, requestError};
}