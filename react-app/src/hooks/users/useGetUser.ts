import axios from 'axios';
import { fastAPIURL } from '../../properties/properties';
import { useCallback } from 'react';

export const useGetUser = () => {
    const url = fastAPIURL;

    const getUser = useCallback(async (token: string) => {
        
        try {
            const response = await axios.get(url + '/users/auth', {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            return response.data; // ユーザーデータを返す
        } catch (error) {
            throw new Error('ユーザー情報の取得に失敗しました');
        }
    }, [url]);
    return { getUser };
};
