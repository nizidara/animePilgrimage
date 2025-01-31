import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'mapbox-gl/dist/mapbox-gl.css';
import reportWebVitals from './reportWebVitals';

const isDevelopment = process.env.REACT_APP_ENV === "development";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    isDevelopment ? (
        <React.StrictMode>
            <App />
        </React.StrictMode>
    ) : (
        <App />
    )
);

reportWebVitals();
