// 🚀 새로운 서비스 워커가 기존 캐시를 삭제하고 즉시 활성화되도록 설정
self.addEventListener("install", (event) => {
    console.log("🚀 [Service Worker] 새로운 버전 설치됨!");
    self.skipWaiting(); // 즉시 기존 서비스 워커 덮어쓰기
  });
  
  self.addEventListener("activate", (event) => {
    console.log("⚡ [Service Worker] 활성화됨! 기존 캐시 삭제 시작...");
  
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            console.log(`🗑️ [Service Worker] 캐시 삭제: ${cacheName}`);
            return caches.delete(cacheName);
          })
        );
      }).then(() => {
        console.log("✅ [Service Worker] 모든 캐시 삭제 완료!");
      })
    );
  });
  
  // 모든 요청을 네트워크로 보내도록 설정 (기존 캐시 무효화)
  self.addEventListener("fetch", (event) => {
    console.log(`🌍 [Service Worker] 네트워크에서 가져오기: ${event.request.url}`);
    event.respondWith(fetch(event.request));
  });