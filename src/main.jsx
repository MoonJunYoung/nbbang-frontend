import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// 기존 서비스 워커 강제 삭제 (배포된 사이트 사용자 대응)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
        registration.unregister();
    });
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
