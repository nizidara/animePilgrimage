import { createContext, useContext, useState, useEffect } from 'react';
import { useLoginUser } from '../hooks/users/useLoginUser';
import { useGetUser } from '../hooks/users/useGetUser';
import { loginData, userData, userToken } from '../type/api/user';
import { useNavigate } from 'react-router-dom';

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
        const token:userToken = await login(loginData.loginId, loginData.password);
        localStorage.setItem('token', token.access_token);
        const userData = await getUser(token.access_token);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            getUser(token).then(setUser).catch(() => logout());
        }
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
