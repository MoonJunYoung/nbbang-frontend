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
