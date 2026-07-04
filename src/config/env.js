/**
 * API Base URL 중앙 관리
 * - npm run dev (development): .env.development의 VITE_API_BASE_URL 사용 (기본 localhost)
 * - npm run build / 프로덕션: .env.production의 VITE_API_BASE_URL 사용 (기본 api.nbbang.cloud)
 */
export const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ?? 'https://api.nbbang.cloud';
