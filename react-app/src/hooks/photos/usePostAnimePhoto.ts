import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { fastAPIURL } from "../../properties/properties";
import { postAnimePhotoData, responseAnimePhotoData } from "../../type/api/photo";
import { useAuth } from "../../providers/AuthContext";

//post AnimePhoto
export const usePostAnimePhoto = (isAdmin:boolean) => {
    const [responseData, setResponseData] = useState<responseAnimePhotoData[] | null>(null);
    const [postError, setPostError] = useState<string | null>(null);
    const navigation = useNavigate();
    const {user} = useAuth();

    //post
    const post = useCallback((placeId : string, images: File[], onAnimePhotoPosted: () => void, callback?: () => void) => {
        setPostError(null);

        const postData : postAnimePhotoData = {
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

        axios.post(`${fastAPIURL}/photos/anime`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            setResponseData(res.data);
            onAnimePhotoPosted();
        }).catch(() => {
            setPostError("投稿中にエラーが発生しました")
        }).finally(() => {
            if(callback) callback();
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