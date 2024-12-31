import { useCallback, useEffect, useState } from "react"
import axios from "axios";
import { fastAPIURL } from "../../properties/properties";
import { responseCommentData } from "../../type/api/comment";

export const useGetCommentList = (place_id: string | null, page: number = 1, page_size: number = 20) => {
    const [commentList, setCommentList] = useState<responseCommentData[]>([]);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchComments = useCallback(() => {
        const queryPage = `&page=${page}`;
        const queryPageSize = `&page_size=${page_size}`;

        axios.get(`${fastAPIURL}/comments/list?place_id=${place_id}${queryPage}${queryPageSize}`)
            .then(response => {
                setCommentList(response.data.comments);
                setTotalCount(response.data.total_count);
                setLoading(false);
            })
            .catch(() => {
                setError("コメント取得中にエラーが発生しました");
                setLoading(false);
            });
    }, [place_id, page, page_size]);

    useEffect(() => {
        fetchComments();
    }, [fetchComments])

    return { commentList, totalCount, loading, error, fetchComments };
};