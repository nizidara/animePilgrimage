import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router } from './router/Router';
import { AuthProvider } from './providers/AuthContext';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const defaultStructData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "にじげんたび",
    "url": "https://pilgrimage.nizidara.com",
    "description": "アニメ系聖地巡礼向けのWebアプリ",
    "thumbnailUrl": "https://pilgrimage.nizidara.com/logo512.png",
    "publisher": {
        "@type": "Organization",
        "name": "にじげんたび"
    }
};

function App() {
    return (
        <HelmetProvider>
            <Helmet defaultTitle="にじげんたび" titleTemplate="%s - にじげんたび">
                <meta name="description" content="アニメ系聖地巡礼向けWebアプリ『にじげんたび』" />
                <meta property="og:image" content="https://pilgrimage.nizidara.com/logo512.png" />
                <meta name="twitter:image" content="https://pilgrimage.nizidara.com/logo512.png" />
                <script type="application/ld+json">
                    {JSON.stringify(defaultStructData)}
                </script>
            </Helmet>
            <AuthProvider>
                <Router />
            </AuthProvider>
        </HelmetProvider>
    );
}

export default App;
