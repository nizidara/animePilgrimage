import axios, { AxiosError } from 'axios';
import { fastAPIURL } from '../../properties/properties';

export const useLoginUser = () => {
    const url = fastAPIURL;
    
    const login = async (loginId: string, password: string) => {
        const loginData: URLSearchParams = new URLSearchParams();
        loginData.append('username', loginId);
        loginData.append('password', password);
        
        try {
            await axios.post(url + '/users/login', loginData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                withCredentials: true,
            });

        } catch (error: AxiosError | unknown) {
            if(axios.isAxiosError(error)){
                if(error.response?.status === 400 || error.response?.status === 404){
                    throw new Error('ログインIDまたはパスワードが違います');
                }else{
                    throw new Error('ログインに失敗しました');
                }
            }else{
                // ネットワークエラーなど
                throw new Error('予期しないエラーが発生しました');
            }
        }
    };

    return { login };
};
