import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import eslint from 'vite-plugin-eslint'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), svgr(), eslint()],
    resolve: {
        alias: {
            shared: '/src/shared',
            entities: '/src/entities',
            features: '/src/features',
            widgets: '/src/widgets',
            pages: '/src/pages',
        },
    },
    build: {
        rollupOptions: {
            output: {
                chunkFileNames: `js/[name].[contenthash].js`,
            },
        },
    },
})
