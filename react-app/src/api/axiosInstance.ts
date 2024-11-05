import axios from "axios";
import { fastAPIURL } from "../properties/properties";

const api = axios.create({
    baseURL: fastAPIURL,
    withCredentials: true,
});

// アクセストークンの再取得を試みるレスポンスインターセプター
api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        // アクセストークンの期限切れエラー(401)が発生した場合
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // リフレッシュトークンから新しいアクセストークンを取得
                await axios.post(fastAPIURL + "/users/refresh", {}, { withCredentials: true });

                // 再取得後、元のリクエストを再試行
                return api(originalRequest);
            } catch (refreshError) {
                console.log("リフレッシュトークンが無効または期限切れです:", refreshError);
                // ここでログインページへのリダイレクトを行うなどの処理を追加できます
            }
        }

        return Promise.reject(error);
    }
);

export default api;
