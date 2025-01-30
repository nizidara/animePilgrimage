import { useEffect, useState } from "react"
import { fastAPIURL } from "../../properties/properties";
import api from "../../api/axiosInstance";
import { responseDeleteCommentData } from "../../type/api/comment";

export const useAdminGetReportCommentDetail = (delete_comment_id: string | number | null) => {
    const [reportComment, setReportComment] = useState<responseDeleteCommentData>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        api.get(`${fastAPIURL}/comments/report/detail/${delete_comment_id}`)
            .then(response => {
                setReportComment(response.data);
                setLoading(false);
            })
            .catch(() => {
                setError("問い合わせ情報取得中にエラーが発生しました");
                setLoading(false);
            });
    }, [delete_comment_id]);

    return { reportComment, loading, error };
};