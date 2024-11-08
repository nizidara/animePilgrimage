import axios from 'axios';
import { fastAPIURL } from '../../properties/properties';
import { useCallback } from 'react';

export const useGetUser = () => {
    const getUser = useCallback(async () => {
        try {
            const response = await axios.get(`${fastAPIURL}/users/auth`, {
                withCredentials: true,
            });
            return response.data; // ユーザーデータを返す
        } catch (error) {
            throw new Error('ユーザー情報の取得に失敗しました');
        }
    }, []);
    return { getUser };
};
