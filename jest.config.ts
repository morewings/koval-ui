export default {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        // process `*.tsx` files with `ts-jest`
    },
    moduleNameMapper: {
        '\\.(gif|ttf|eot|svg|png)$': 'identity-obj-proxy',
        '\\.css$': 'identity-obj-proxy',
    },
    coverageReporters: [
        [
            'lcov',
            {
                projectRoot: '.',
            },
        ],
    ],
    collectCoverageFrom: [
        'src/lib/**/*.ts',
        'src/lib/**/*.tsx',
        '!src/lib/**/index.ts',
        '!**/node_modules/**',
    ],
};
