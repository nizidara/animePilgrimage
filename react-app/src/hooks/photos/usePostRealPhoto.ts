import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { fastAPIURL } from "../../properties/properties";
import { postRealPhotoData, responseRealPhotoData } from "../../type/api/photo";
import { useAuth } from "../../providers/AuthContext";

//post realPhoto
export const usePostRealPhoto = (isAdmin: boolean) => {
    const [responseData, setResponseData] = useState<responseRealPhotoData[] | null>(null);
    const [postError, setPostError] = useState<string | null>(null);
    const navigation = useNavigate();
    const {user} = useAuth();

    //post
    const post = useCallback((placeId : string, images: File[], onRealPhotoPosted: () => void) => {
        setPostError(null);

        const postData : postRealPhotoData = {
            place_id: placeId,
            // now null olny
            user_id: user ? user.user_id : null,
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

        axios.post(`${fastAPIURL}/photos/reals`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            setResponseData(res.data);
            onRealPhotoPosted();
        }).catch(() => {
            setPostError("投稿中にエラーが発生しました");
        });
    }, [setResponseData, user])

    // responseがnullで無ければ完了ページに遷移
    useEffect(() => {
        if(responseData!== null){
            const placeId = responseData[0].place_id;
            isAdmin ? navigation(`/admin/place?place_id=${placeId}`) : navigation("/place/photo", {state: {placeId}});            
        }
    }, [responseData, navigation, isAdmin])

    return { post, postError };
}