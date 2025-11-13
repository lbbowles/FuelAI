import { defineConfig, loadEnv } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import path from 'path';

export default defineConfig(({ mode }) => {

    const env = loadEnv(mode, process.cwd(), '');

    return {
        plugins: [
            laravel({
                input: ['resources/css/app.css', 'resources/js/app.tsx'],
                ssr: 'resources/js/ssr.tsx',
                refresh: true,
            }),
            react(),
            tailwindcss(),
            ...(process.env.NODE_ENV !== 'production' ? [
                wayfinder({
                    formVariants: true,
                })
            ] : []),
        ],

        // This alias is helpful for imports
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'resources/js'),
            },
        },

        esbuild: {
            jsx: 'automatic',
        },

        // This block tells Vite where the backend is
        server: {
            host: 'fuelai.test', // Tell Vite to run on this host
            proxy: {
                // This proxies all API requests to your Laravel server
                '^/(?!resources|@vite|@react-refresh|node_modules|favicon.ico|apple-touch-icon.png|fuelai.svg|robots.txt).*$': {
                    target: env.APP_URL, // This uses 'http://fuelai.test' from your .env
                    changeOrigin: true,
                },
            },
        },
    }
});
