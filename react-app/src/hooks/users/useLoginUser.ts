import axios from 'axios';
import { fastAPIURL } from '../../properties/properties';

export const useLoginUser = () => {
    const url = fastAPIURL;
    
    const login = async (loginId: string, password: string) => {
        const formData : any = {
            username: loginId,
            password: password
        }
        try {
            const response = await axios.post(url + '/users/login', formData,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            return response.data; // 取得したトークンなどを返す
        } catch (error) {
            throw new Error('ログインに失敗しました');
        }
    };

    return { login };
};
