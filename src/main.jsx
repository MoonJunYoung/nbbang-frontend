import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// ✅ 기존 서비스 워커 삭제 코드
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => {
          registration.unregister().then(() => {
              console.log("✅ 기존 서비스 워커 삭제 완료");
          });
      });
  });
}

// ✅ 기존 캐시 삭제 (JS, API 응답 등)
if (window.caches) {
  caches.keys().then((cacheNames) => {
      cacheNames.forEach((cacheName) => {
          caches.delete(cacheName).then(() => {
              console.log(`✅ 캐시 삭제 완료: ${cacheName}`);
          });
      });
  });
}

// ✅ 강제 새로고침을 단 1회만 실행 (localStorage 사용)
if (!localStorage.getItem("hasReloaded")) {
  localStorage.setItem("hasReloaded", "true"); // 🚀 새로고침 여부 저장

  setTimeout(() => {
      console.log("🔄 강제 새로고침 실행");
      window.location.reload(true); // ✅ 기존 캐시 무효화 후 최신 JS 로드
  }, 2000);
} else {
  console.log("🛑 이미 새로고침 됨, 추가 실행 방지");
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
