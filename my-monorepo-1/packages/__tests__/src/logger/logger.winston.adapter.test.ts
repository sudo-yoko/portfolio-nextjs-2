import test, { before, describe, mock } from 'node:test';

import { Level, ServerLogger } from '@/logger/src/internal/isomorphic/logger.types';

void describe('', async () => {
    type moduleType = typeof import('@/logger/src/internal/server/logger.winston.adapter');
    let winstonAdapter: moduleType['winstonAdapter'];

    before(async () => {
        mock.module('server-only', { defaultExport: {}, namedExports: {} });
        winstonAdapter = (await import('@/logger/src/internal/server/logger.winston.adapter')).winstonAdapter;
    });

    // clear & npm run node:test -- --test-name-pattern=test1-1 src/logger/logger.winston.adapter.test.ts
    void test('test1-1', () => {
        const logger: ServerLogger = winstonAdapter;
        logger.log(Level.Info, { format: 'test=%s', params: ['aaa'] });
    });

    // clear & npm run node:test -- --test-name-pattern=test1-2 src/logger/logger.winston.adapter.test.ts
    void test('test1-2', () => {
        const logger: ServerLogger = winstonAdapter;
        logger.log(Level.Info, {
            logPrefix: 'logger.winston.adapter.test.ts: ',
            format: 'test=%s',
            params: ['aaa'],
        });
    });
});
