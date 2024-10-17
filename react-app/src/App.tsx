import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router } from './router/Router';
import { AuthProvider } from './providers/AuthContext';

function App() {
    return (
        <AuthProvider>
            <Router />
        </AuthProvider>
    );
}

export default App;
