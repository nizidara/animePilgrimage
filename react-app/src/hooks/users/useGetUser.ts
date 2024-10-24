import axios from 'axios';
import { fastAPIURL } from '../../properties/properties';
import { useCallback } from 'react';

export const useGetUser = () => {
    const url = fastAPIURL;

    const getUser = useCallback(async () => {
        try {
            const response = await axios.get(url + '/users/auth', {
                withCredentials: true,
            });
            return response.data; // ユーザーデータを返す
        } catch (error) {
            console.log(error)
            throw new Error('ユーザー情報の取得に失敗しました');
        }
    }, [url]);
    return { getUser };
};
