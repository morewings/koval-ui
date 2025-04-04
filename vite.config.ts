import {resolve} from 'path';

import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import hq from 'alias-hq';
import external from '@yelo/rollup-node-external';
import dts from 'vite-plugin-dts';
import postcssPresetEnv from 'postcss-preset-env';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(({command}) => ({
    // don't bundle public directory
    publicDir: command === 'build' ? false : 'public',
    resolve: {
        alias: hq.get('rollup'),
    },
    plugins: [
        svgr({
            svgrOptions: {
                typescript: true,
            },
            esbuildOptions: {
                loader: 'tsx',
            },
            include: '**/*.svg?react',
        }),
        react(),
        dts({rollupTypes: true, exclude: ['**/*.stories.(ts|tsx)']}),
    ],
    build: {
        sourcemap: true,
        lib: {
            entry: resolve(__dirname, 'src/lib/index.ts'),
            name: 'KovalUI',
            // the proper extensions will be added
            fileName: (format, entryName) => {
                if (entryName === 'src/lib/index') {
                    return `index.${format === 'es' ? 'js' : 'cjs'}`;
                }
                return `${entryName}.${format === 'es' ? 'js' : 'cjs'}`;
            },
            formats: ['es', 'cjs'],
        },
        rollupOptions: {
            // make sure to externalize deps that
            // shouldn't be bundled into your library
            external: external({
                whitelist: [/^the-new-css-reset/, /^@material-symbols/, /^@phosphor-icons/],
            }),
            output: {
                // enable tree shaking
                preserveModules: true,
                // ensure Next.js compatibility
                banner: "'use client';",
            },
        },
    },
    css: {
        modules: {
            localsConvention: 'camelCase',
        },
        postcss: {
            plugins: [postcssPresetEnv({stage: 1})],
        },
    },
}));
