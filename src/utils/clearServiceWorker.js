export async function clearServiceWorker() {
    if (!("serviceWorker" in navigator)) {
      console.log("❌ 브라우저가 서비스 워커를 지원하지 않습니다.");
      return;
    }
  

    if (localStorage.getItem("sw-cleared")) {
      console.log("⏳ 서비스 워커와 캐시는 이미 삭제됨.");
      return;
    }
  
    console.log("🔄 서비스 워커 및 캐시 삭제 중...");
  
    try {

      const registrations = await navigator.serviceWorker.getRegistrations();
      if (registrations.length === 0) {
        console.log("✅ 삭제할 서비스 워커가 없습니다.");
      } else {
        for (const registration of registrations) {
          if (registration.waiting) {
            registration.waiting.postMessage({ type: "SKIP_WAITING" });
          }
          const success = await registration.unregister();
          console.log(success ? "✅ 서비스 워커 삭제 완료!" : "❌ 서비스 워커 삭제 실패!");
        }
      }
  
      if (window.caches) {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames.map(async (cacheName) => {
            const success = await caches.delete(cacheName);
            console.log(success ? `✅ 캐시 삭제 완료: ${cacheName}` : `❌ 캐시 삭제 실패: ${cacheName}`);
          })
        );
      }
  

      localStorage.setItem("sw-cleared", "true");
  

      console.log("🔄 새로고침 실행...");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("❌ 서비스 워커 삭제 중 오류 발생:", error);
    }
  }