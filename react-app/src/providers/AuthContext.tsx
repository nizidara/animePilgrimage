import { createContext, useContext, useState, useEffect } from 'react';
import { useLoginUser } from '../hooks/users/useLoginUser';
import { useGetUser } from '../hooks/users/useGetUser';
import { loginData, userData } from '../type/api/user';
import axios from 'axios';
import { fastAPIURL } from '../properties/properties';
import { Spinner } from 'react-bootstrap';

type AuthContextType = {
    user: userData | null;
    login: (loginData: loginData) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<userData | null>(null);
    const [loading, setLoading] = useState(true);
    const { login } = useLoginUser(); 
    const { getUser } = useGetUser(); 

    const handleLogin = async (loginData : loginData) => {
        await login(loginData.loginId, loginData.password);
        const userData = await getUser();
        setUser(userData);
    };

    const logout = async () => {
        try {
            await axios.post(fastAPIURL + '/users/logout', {}, { withCredentials: true });
            setUser(null);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try{
                const userData = await getUser();
                setUser(userData);
            } catch(error) {
                try{
                    //token再取得
                    await axios.post(fastAPIURL + '/users/refresh', {}, { withCredentials: true });
                    const userData = await getUser();
                    setUser(userData);
                } catch {
                    logout();
                }
            }finally{
                setLoading(false);
            }
        };

        fetchUser();
    }, [getUser]);

    return (
        <AuthContext.Provider value={{ user, login: handleLogin, logout }}>
            {loading? <center><Spinner animation="border" /></center>: children}
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
