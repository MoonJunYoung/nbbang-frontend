const CACHE_NAME = "no-cache-mode-v1"; // 새로운 캐시 네임 (기존 캐시 무효화)

// ✅ 서비스 워커 설치 시 기존 캐시를 삭제
self.addEventListener("install", (event) => {
    console.log("✅ [Service Worker] 설치됨");
    self.skipWaiting(); // 기존 서비스 워커 즉시 대체
});

// ✅ 서비스 워커 활성화 시 기존 캐시 모두 삭제
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

// ✅ 네트워크 요청 처리 (항상 최신 파일 가져오고, 실패 시 캐시 제공)
self.addEventListener("fetch", (event) => {
    console.log("⚡ [Service Worker] 최신 파일 요청:", event.request.url);
    event.respondWith(
        fetch(event.request)
            .then((response) => {
                return caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, response.clone()); // 최신 파일을 캐시에 저장
                    return response;
                });
            })
            .catch(() => {
                console.log("⚠️ [Service Worker] 네트워크 오류 - 캐시된 파일 제공");
                return caches.match(event.request); // 네트워크 요청 실패 시 캐시된 파일 제공
            })
    );
});