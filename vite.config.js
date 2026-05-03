import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        outDir: './public',
        emptyOutDir: true,
    },
    root: '.',
    server: {
        port: 5173,
        proxy: {
            '/self-employment-services': {
                target: 'http://localhost:3000',
                changeOrigin: true
            }
        }
    }
});