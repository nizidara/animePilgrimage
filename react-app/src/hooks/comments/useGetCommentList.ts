import { useCallback, useEffect, useState } from "react"
import axios from "axios";
import { fastAPIURL } from "../../properties/properties";
import { responseCommentData } from "../../type/api/comment";

export const useGetCommentList = (place_id: string | null) => {
    const [commentList, setCommentList] = useState<responseCommentData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchComments = useCallback(() => {
        axios.get(`${fastAPIURL}/comments/list?place_id=${place_id}`)
            .then(response => {
            setCommentList(response.data);
            setLoading(false);
            })
            .catch(error => {
            setError(error.message);
            setLoading(false);
            });
    }, [place_id]);

    useEffect(() => {
        fetchComments();
    }, [fetchComments])

    return { commentList, loading, error, fetchComments };
};