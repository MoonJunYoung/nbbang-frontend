export const APP_UPDATE_SESSION_KEY = 'nbbang-app-update-required';
export const MIGRATED_PARAM = 'migrated';

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

export const isAppUpdateRequired = ({ searchParams, minVersion }) => {
    if (!isNbbangAppWebView()) {
        return false;
    }

    const detected = getAppVersionFromUserAgent();
    if (detected) {
        const needsUpdate = compareSemver(detected, minVersion) < 0;
        if (!needsUpdate) {
            sessionStorage.removeItem(APP_UPDATE_SESSION_KEY);
        }
        return needsUpdate;
    }

    return (
        searchParams.get(MIGRATED_PARAM) === '1' ||
        sessionStorage.getItem(APP_UPDATE_SESSION_KEY) === 'true'
    );
};

export const markAppUpdateRequired = () => {
    sessionStorage.setItem(APP_UPDATE_SESSION_KEY, 'true');
};
