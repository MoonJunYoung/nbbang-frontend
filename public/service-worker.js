const CACHE_NAME = "no-cache-mode-v2"; // ✅ 캐시 이름 변경 (기존 캐시 무효화)

// ✅ 기존 캐시 삭제 후 서비스 워커 활성화
self.addEventListener("install", (event) => {
    console.log("✅ [Service Worker] 설치됨");
    self.skipWaiting(); // ✅ 기존 서비스 워커 즉시 대체
});

// ✅ 기존 캐시 삭제
self.addEventListener("activate", (event) => {
    console.log("✅ [Service Worker] 활성화됨 - 기존 캐시 삭제 중");
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

    return self.clients.claim(); // 모든 열린 탭에서 즉시 적용
});

// ✅ 최신 파일을 항상 가져오도록 설정 (network-first)
self.addEventListener("fetch", (event) => {
    console.log("⚡ [Service Worker] 최신 파일 요청:", event.request.url);
    event.respondWith(
        fetch(event.request) // ✅ 최신 파일 요청
            .then((networkResponse) => {
                return caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, networkResponse.clone()); // 최신 파일을 캐시에 저장
                    return networkResponse;
                });
            })
            .catch(() => {
                console.log("⚠️ [Service Worker] 네트워크 오류 - 캐시된 파일 제공");
                return caches.match(event.request); // 네트워크 요청 실패 시 캐시된 파일 제공
            })
    );
});