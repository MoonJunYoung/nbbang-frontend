/**
 * API Base URL 중앙 관리
 * - npm run dev (development): .env.development의 VITE_API_BASE_URL 사용 (기본 localhost)
 * - npm run build / 프로덕션: .env.production의 VITE_API_BASE_URL 사용 (기본 api.nbbang.cloud)
 */
export const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ?? 'https://api.nbbang.cloud';

export const MIN_APP_VERSION =
    import.meta.env.VITE_MIN_APP_VERSION ?? '1.1.1';

export const PLAY_STORE_URL =
    import.meta.env.VITE_PLAY_STORE_URL ??
    'https://play.google.com/store/apps/details?id=nbbang.middle&hl=ko';
