import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { fastAPIURL } from "../../properties/properties";
import { postCommentData, responseCommentData } from "../../type/api/comment";

//post comment
export const usePostComment = () => {
    const [responseData, setResponseData] = useState<responseCommentData | null>(null);
    const navigation = useNavigate();
    const url = fastAPIURL;

    //post
    const post = useCallback((comment: string, placeId : string, images: File[], onCommentPosted: () => void) => {
        if(images.length != 0 && comment.length == 0){
            comment = " ";
        }

        const postData : postCommentData = {
            comment: comment,
            comment_date: new Date().toISOString(),
            range_id: 0,    //now 0(public) only
            place_id: placeId,
            // now null olny
            user_id: null
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

        axios.post(url + "/comments", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            setResponseData(res.data);
            onCommentPosted();
        });
    }, [setResponseData])

    // responseがnullで無ければ完了ページに遷移
    useEffect(() => {
        if(responseData!== null){
            navigation(`/place?place_id=${responseData.place_id}`)
        }
    }, [responseData, navigation])

    return {post};
}