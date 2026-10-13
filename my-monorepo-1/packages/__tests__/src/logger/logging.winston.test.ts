import test from 'node:test';

// clear & npm run node:test -- --test-name-pattern=test1-1 src/logger/logging.winston.test.ts
void test('test1-1', async (t) => {
    t.mock.module('server-only', { defaultExport: {}, namedExports: {} });
    t.mock.module('@/env/src/internal/env.helper.validated.ts', {
        namedExports: {
            envNodeEnvNext: () => 'test',
            envFwDebugLogger: () => true,
            NodeEnvNext: {},
        },
    });
    const logger = (await import('@/logger/src/internal/logging.winston')).default;
    logger.info(t.name);
});
