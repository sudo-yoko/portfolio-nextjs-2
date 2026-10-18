import test, { afterEach, before, describe, mock } from 'node:test';

import type { TCreateAppLogger } from '@/logger/src/internal/logger.winston';

// clear & npm run node:test -- src/logger/logger.winston.test.ts
void describe('logging.winston.test.ts の実行', async () => {
    const mockedEnv = {
        node_env: 'mock',
    };
    // type TargetModule = typeof import('@/logger/src/internal/logging.winston');
    // let mockedCreateAppLogger: TargetModule['createAppLogger'];
    let mockedCreateAppLogger: TCreateAppLogger;
    let logger: ReturnType<TCreateAppLogger> | undefined;

    before(async () => {
        mock.module('server-only', { defaultExport: {}, namedExports: {} });
        mock.module('@/env/src/internal/env.s', {
            namedExports: {
                env: mockedEnv,
            },
        });
        mockedCreateAppLogger = (await import('@/logger/src/internal/logger.winston')).createAppLogger;
    });

    afterEach(() => {
        logger?.close();
    });

    void test('test1-1', async (t) => {
        mockedEnv.node_env = 'production';
        logger = mockedCreateAppLogger();
        console.log(`${t.name} logging start.`);
        logger.info(t.name);
        console.log(`${t.name} logging end.`);
    });

    void test('test1-2', async (t) => {
        mockedEnv.node_env = 'development';
        logger = mockedCreateAppLogger();
        console.log(`${t.name} logging start.`);
        logger.info(t.name);
        console.log(`${t.name} logging end.`);
    });
});
