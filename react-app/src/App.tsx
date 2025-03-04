import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router } from './router/Router';
import { AuthProvider } from './providers/AuthContext';
import { Helmet, HelmetProvider } from 'react-helmet-async';

function App() {
    return (
        <HelmetProvider>
            <Helmet defaultTitle="にじげんたび 聖地巡礼" titleTemplate="%s - にじげんたび 聖地巡礼" />
            <AuthProvider>
                <Router />
            </AuthProvider>
        </HelmetProvider>
    );
}

export default App;
