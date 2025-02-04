import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: [
                'favicon.ico',
                'apple-touch-icon.png',
                'masked-icon.svg',
            ],
            injectRegister: 'auto', // 서비스 워커 자동 등록
            strategies: 'generateSW',
            manifest: {
                name: 'Nbbang',
                short_name: 'Nbbang',
                description: '빠른 정산, 원클릭 송금',
                theme_color: '#ffffff',
                start_url: '/',
                icons: [
                    {
                        src: 'images/nbbang.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: 'images/nbbang.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any maskable',
                    },
                ],
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
                maximumFileSizeToCacheInBytes: 3 * 1024 * 1024, // 3 MiB로 설정
                skipWaiting: true, // 서비스 워커 업데이트 시 즉시 활성화
                clientsClaim: true, // 새 서비스 워커가 기존 클라이언트를 즉시 제어
            },
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
