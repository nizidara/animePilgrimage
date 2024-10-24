import { createContext, useContext, useState, useEffect } from 'react';
import { useLoginUser } from '../hooks/users/useLoginUser';
import { useGetUser } from '../hooks/users/useGetUser';
import { loginData, userData, userToken } from '../type/api/user';

type AuthContextType = {
    user: userData | null;
    login: (loginData: loginData) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<userData | null>(null);
    const { login } = useLoginUser(); 
    const { getUser } = useGetUser(); 

    const handleLogin = async (loginData : loginData) => {
        await login(loginData.loginId, loginData.password);
        //localStorage.setItem('token', token.access_token);
        const userData = await getUser();
        setUser(userData);
    };

    const logout = () => {
        document.cookie = 'access_token=; Max-Age=0; path=/;';
        setUser(null);
    };

    useEffect(() => {
        // const token = localStorage.getItem('token');
        // if (token) {
        //     getUser(token).then(setUser).catch(() => logout());
        // }
        const fetchUser = async () => {
            const userData = await getUser(); // Cookieからトークンを使用してユーザー情報を取得
            setUser(userData);
        };

        fetchUser().catch(() => logout());
    }, [getUser]);

    return (
        <AuthContext.Provider value={{ user, login: handleLogin, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
