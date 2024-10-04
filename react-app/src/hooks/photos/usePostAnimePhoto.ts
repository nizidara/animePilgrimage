import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { fastAPIURL } from "../../properties/properties";
import { postAnimePhotoData, responseAnimePhotoData } from "../../type/api/photo";

//post comment
export const usePostAnimePhoto = () => {
    const [responseData, setResponseData] = useState<responseAnimePhotoData | null>(null);
    const navigation = useNavigate();
    const url = fastAPIURL;

    //post
    const post = useCallback((placeId : string, images: File[], onAnimePhotoPosted: () => void) => {
        const postData : postAnimePhotoData = {
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

        axios.post(url + "/photos/anime", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            setResponseData(res.data);
            onAnimePhotoPosted();
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