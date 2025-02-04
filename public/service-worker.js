self.addEventListener("install", (event) => {
    console.log("✅ [Service Worker] 새 버전 설치됨");
    self.skipWaiting(); // 기존 서비스 워커 즉시 대체
});

self.addEventListener("activate", (event) => {
    console.log("✅ [Service Worker] 활성화됨 - 기존 서비스 워커 대체");
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    console.log(`🗑️ 기존 캐시 삭제: ${cache}`);
                    return caches.delete(cache); // 기존 캐시 삭제
                })
            );
        })
    );
    return self.clients.claim(); // 기존 페이지에서도 즉시 적용
});