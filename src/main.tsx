import React from 'react';
import ReactDOM from 'react-dom/client';

import App from '@/env/App/App.tsx';

import '@/lib/CSS/styles.css';

// eslint-disable-next-line ssr-friendly/no-dom-globals-in-module-scope
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
