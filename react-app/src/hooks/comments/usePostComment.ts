import axios from "axios";
import { useCallback, useState } from "react";
import { fastAPIURL } from "../../properties/properties";
import { postCommentData } from "../../type/api/comment";
import { useAuth } from "../../providers/AuthContext";

//post comment
export const usePostComment = () => {
    const [postError, setPostError] = useState<string | null>(null);
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
        }).then(() => {
            onCommentPosted();
        }).catch(() => {
            setPostError("投稿時にエラーが発生しました");
        }).finally(() => {
            if(callback) callback();
        });
    }, [user]);

    return {post, postError};
}