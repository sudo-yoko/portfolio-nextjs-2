import test, { afterEach, before, describe, mock } from 'node:test';

// clear & npm run node:test -- src/logger/logger.winston.test.ts
void describe('logging.winston.test.ts の実行', async () => {
    const { env } = await import('@/env/src/internal/isomophic/env');
    const mockedEnv = {
        node_env: env.node_env,
        next_public_fw_debug_logger: env.next_public_fw_debug_logger,
    };
    type moduleType = typeof import('@/logger/src/internal/server/logger.winston');
    let createAppLogger: moduleType['createAppLogger'];
    let logger: ReturnType<moduleType['createAppLogger']> | undefined;

    before(async () => {
        mock.module('server-only', { defaultExport: {}, namedExports: {} });
        mock.module('@/env/src/internal/isomophic/env.ts', {
            namedExports: {
                env: mockedEnv,
            },
        });
        createAppLogger = (await import('@/logger/src/internal/server/logger.winston')).createAppLogger;
    });

    afterEach(() => {
        logger?.close();
    });

    void test('test1-1', async (t) => {
        mockedEnv.node_env = 'production';
        logger = createAppLogger();
        console.log(`${t.name} logging start.`);
        logger.info(t.name);
        console.log(`${t.name} logging end.`);
    });

    void test('test1-2', async (t) => {
        mockedEnv.node_env = 'development';
        logger = createAppLogger();
        console.log(`${t.name} logging start.`);
        logger.info(t.name);
        console.log(`${t.name} logging end.`);
    });
});
