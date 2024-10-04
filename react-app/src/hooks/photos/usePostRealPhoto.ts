import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { fastAPIURL } from "../../properties/properties";
import { postCommentData, responseCommentData } from "../../type/api/comment";
import { postRealPhotoData } from "../../type/api/photo";

//post comment
export const usePostRealPhoto = () => {
    const [responseData, setResponseData] = useState<responseCommentData | null>(null);
    const navigation = useNavigate();
    const url = fastAPIURL;

    //post
    const post = useCallback((placeId : string, images: File[], onRealPhotoPosted: () => void) => {
        const postData : postRealPhotoData = {
            place_id: placeId,
            // now null olny
            user_id: null,
            comment_id: null,
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

        axios.post(url + "/photos/reals", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            setResponseData(res.data);
            onRealPhotoPosted();
        });
    }, [setResponseData])

    // responseがnullで無ければ完了ページに遷移
    useEffect(() => {
        if(responseData!== null){
            navigation(`/place/photo`, {state: responseData.place_id})
        }
    }, [responseData, navigation])

    return {post};
}