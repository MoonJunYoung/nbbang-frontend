export const isNbbangAppWebView = () =>
    typeof window !== 'undefined' && !!window.ReactNativeWebView;

export const getAppVersionFromUserAgent = () => {
    const match = navigator.userAgent.match(/NbbangApp\/(\d+\.\d+\.\d+)/);
    return match?.[1] ?? null;
};

export const compareSemver = (a, b) => {
    const partsA = a.split('.').map(Number);
    const partsB = b.split('.').map(Number);

    for (let i = 0; i < 3; i++) {
        const diff = (partsA[i] ?? 0) - (partsB[i] ?? 0);
        if (diff !== 0) {
            return diff;
        }
    }

    return 0;
};

export const isAppUpdateRequired = ({ minVersion }) => {
    if (!isNbbangAppWebView()) {
        return false;
    }

    const detected = getAppVersionFromUserAgent();
    if (!detected) {
        return true;
    }

    return compareSemver(detected, minVersion) < 0;
};

/** 앱 WebView에서 Play Store 네이티브 열기를 지원하는 최소 버전 (App.js openPlayStore) */
export const PLAY_STORE_NATIVE_MIN_VERSION = '1.1.2';

export const canOpenPlayStoreNatively = () => {
    const detected = getAppVersionFromUserAgent();
    if (!detected) {
        return false;
    }

    return compareSemver(detected, PLAY_STORE_NATIVE_MIN_VERSION) >= 0;
};
