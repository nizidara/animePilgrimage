import axios from 'axios';
import { fastAPIURL } from '../../properties/properties';

export const useLoginUser = () => {
    const url = fastAPIURL;
    

    const login = async (loginId: string, password: string) => {
        const formData : any = {
            login_id: loginId,
            password: password
        }
        try {
            const response = await axios.post(url + '/users/login', formData);
            return response.data; // 取得したトークンなどを返す
        } catch (error) {
            throw new Error('ログインに失敗しました');
        }
    };
    return { login };
};
