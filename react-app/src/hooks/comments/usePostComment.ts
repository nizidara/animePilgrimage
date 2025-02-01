import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { fastAPIURL } from "../../properties/properties";
import { postCommentData, responseCommentData } from "../../type/api/comment";
import { useAuth } from "../../providers/AuthContext";

//post comment
export const usePostComment = () => {
    const [responseData, setResponseData] = useState<responseCommentData | null>(null);
    const [postError, setPostError] = useState<string | null>(null);
    const navigation = useNavigate();
    const {user} = useAuth();
    
    //post
    const post = useCallback((comment: string, placeId : string, images: File[], onCommentPosted: () => void, callback?: () => void) => {
        setPostError(null);
        
        if(images.length !== 0 && comment.length === 0){
            comment = " ";
        }
        const postData : postCommentData = {
            comment: comment,
            range_id: 0,    //now 0(public) only
            place_id: placeId,
            user_id: user ? user.user_id : null
        }

        const formData = new FormData();

        Object.keys(postData).forEach((key) => {
            const value = (postData as any)[key];
            if (value !== null && value !== undefined) {
                formData.append(key, value);
            }
        });

        images.forEach((image) => {
            formData.append('images', image);
        });

        axios.post(`${fastAPIURL}/comments`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            setResponseData(res.data);
            onCommentPosted();
        }).catch(() => {
            setPostError("投稿時にエラーが発生しました");
        }).finally(() => {
            if(callback) callback();
        });
    }, [setResponseData, user])

    // responseがnullで無ければ完了ページに遷移
    useEffect(() => {
        if(responseData!== null){
            navigation(`/place?place_id=${responseData.place_id}`)
        }
    }, [responseData, navigation])

    return {post, postError};
}