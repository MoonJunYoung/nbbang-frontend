// service-worker.js

// 설치 단계에서 곧바로 대기(waiting)에 머무르지 않고 활성화되도록
self.addEventListener('install', (event) => {
    self.skipWaiting();
  });
  
  self.addEventListener('activate', async (event) => {
    // 1) 기존에 브라우저가 가지고 있던 모든 캐시 제거
    const cacheKeys = await caches.keys();
    await Promise.all(cacheKeys.map((key) => caches.delete(key)));
  
    // 2) 자기 자신(= 현재 등록된 SW)도 unregister
    if (self.registration && self.registration.unregister) {
      await self.registration.unregister();
    }
    
    // 활성화되자마자 스스로 죽게 되므로, 이후에는 SW가 없는 상태가 됨
  });