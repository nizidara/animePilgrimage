import axios from 'axios';

export const useGetUser = () => {
    const getUser = async (token: string) => {
        try {
            const response = await axios.get('/api/user', {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data; // ユーザーデータを返す
        } catch (error) {
            throw new Error('ユーザー情報の取得に失敗しました');
        }
    };
    return { getUser };
};
