import { useEffect, useState } from "react"
import axios from "axios";
import { fastAPIURL } from "../../properties/properties";
import { responseCommentData } from "../../type/api/comment";

export const useGetCommentDetail = (comment_id: string | null) => {
    const [comment, setComment] = useState<responseCommentData>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.get(`${fastAPIURL}/comments/detail/${comment_id}`)
        .then(response => {
            setComment(response.data);
            setLoading(false);
        })
        .catch(() => {
            setError("コメント取得中にエラーが発生しました");
            setLoading(false);
        });
    }, [comment_id]);

    return { comment, loading, error };
};