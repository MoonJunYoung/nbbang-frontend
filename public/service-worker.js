const CACHE_NAME = "dynamic-cache-v2"; // 🔥 캐시 버전 변경 (기존 캐시 무효화)

self.addEventListener("install", (event) => {
    console.log("✅ [Service Worker] 설치됨");
    self.skipWaiting(); // 🔥 기존 서비스 워커를 즉시 대체
});

self.addEventListener("activate", (event) => {
    console.log("✅ [Service Worker] 활성화됨");
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME) // ✅ 기존 캐시 삭제
                    .map((name) => caches.delete(name))
            );
        })
    );
    return self.clients.claim(); // ✅ 모든 활성화된 클라이언트에서 즉시 적용
});

self.addEventListener("fetch", (event) => {
    if (event.request.destination === "script") {
        console.log("⚡ [Service Worker] 최신 JS 파일 로드:", event.request.url);
        event.respondWith(
            fetch(event.request) // ✅ 최신 JS 파일 우선 요청
                .then((networkResponse) => {
                    return caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, networkResponse.clone()); // ✅ 최신 파일을 캐시에 저장
                        return networkResponse;
                    });
                })
                .catch(() => {
                    console.log("⚠️ [Service Worker] 네트워크 실패, 캐시된 JS 파일 제공");
                    return caches.match(event.request); // ❌ 네트워크 실패 시 캐싱된 파일 사용
                })
        );
    } else {
        event.respondWith(
            caches.match(event.request).then((response) => {
                return response || fetch(event.request).then((networkResponse) => {
                    return caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                });
            })
        );
    }
});