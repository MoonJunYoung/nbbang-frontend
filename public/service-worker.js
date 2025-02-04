const CACHE_NAME = "dynamic-cache-v1";


self.addEventListener("install", (event) => {
    console.log("✅ Service Worker 설치됨");
    self.skipWaiting(); 
});

self.addEventListener("activate", (event) => {
    console.log("✅ Service Worker 활성화됨");
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => caches.delete(name))
            );
        })
    );
    return self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    if (event.request.destination === "script") {
        event.respondWith(
            fetch(event.request) 
                .then((networkResponse) => {
                    return caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, networkResponse.clone()); 
                        return networkResponse;
                    });
                })
                .catch(() => caches.match(event.request)) 
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