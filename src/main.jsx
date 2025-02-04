import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js").then((registration) => {
      console.log("✅ [Service Worker] 등록 완료:", registration);

      // ✅ 서비스 워커가 업데이트되었을 때 감지하여 강제 새로고침
      registration.onupdatefound = () => {
          const newWorker = registration.installing;
          newWorker.onstatechange = () => {
              if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                  console.log("🔄 새로운 서비스 워커 감지됨 - 강제 새로고침 실행!");
                  window.location.reload(true); // ✅ 즉시 새로고침하여 최신 버전 적용
              }
          };
      };
  });
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
