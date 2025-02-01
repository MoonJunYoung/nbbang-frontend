import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((registration) => {
      registration.unregister();
    });
  }).catch((error) => {
    console.error('Service Worker unregistration failed:', error);
  });
}

if (window.caches) {
  caches.keys().then((cacheNames) => {
    return Promise.all(
      cacheNames.map((cacheName) => {
        return caches.delete(cacheName);
      })
    );
  }).then(() => {
    console.log('All caches deleted');
  }).catch((error) => {
    console.error('Cache deletion failed:', error);
  });
}

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
