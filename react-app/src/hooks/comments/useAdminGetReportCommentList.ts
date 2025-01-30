import { useEffect, useState } from "react"
import { fastAPIURL } from "../../properties/properties";
import api from "../../api/axiosInstance";
import { responseDeleteCommentData } from "../../type/api/comment";

export const useAdminGetReportCommentList = () => {
    const [reportCommentList, setReportCommentList] = useState<responseDeleteCommentData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        api.get(`${fastAPIURL}/comments/report/list`)
            .then(response => {
                setReportCommentList(response.data);
                setLoading(false);
            })
            .catch(() => {
                setError("問い合わせ情報取得中にエラーが発生しました");
                setLoading(false);
            });
    }, []);

    return { reportCommentList, loading, error };
};