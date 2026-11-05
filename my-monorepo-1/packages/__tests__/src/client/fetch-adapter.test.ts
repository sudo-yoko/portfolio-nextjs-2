import test, { before, describe, mock } from 'node:test';

import {
    ACCEPT_APPLICATION_JSON,
    CONTENT_TYPE_APPLICATION_FORM,
    CONTENT_TYPE_APPLICATION_JSON_UTF8,
} from '@/client/src/internal/isomorphic/client.constants';
import { Method, RequestConfig } from '@/client/src/internal/isomorphic/client.types';
import { Level } from '@/logger/src';
import { logger, logPrefix } from '@/tests/test-logger';

void describe('', () => {
    type TargetModuleType = typeof import('@/client/src/internal/isomorphic/adapters/fetch-adapter');
    let createFetchClient: TargetModuleType['createFetchClient'];

    before(async () => {
        mock.module('@/client/src/internal/isomorphic/adapters/fetch-adapter.transport.ts', {
            namedExports: {
                executeFetch: (...args: Parameters<typeof fetch>) => {
                    console.log(logPrefix, 'executeFetch(mock) -> args=', args);
                    const status: number = 200;
                    const rawBody: string = 'test';
                    return { status, rawBody };
                },
            },
        });
        createFetchClient = (await import('@/client/src/internal/isomorphic/adapters/fetch-adapter'))
            .createFetchClient;
    });

    // clear & npm run node:test -- --test-name-pattern=test1-1 src/client/fetch-adapter.test.ts
    void test('test1-1', async () => {
        const client = createFetchClient(logger);
        const result = await client.send({
            method: Method.GET,
            url: '/api/bff/test',
        });
        console.log(logPrefix, 'result=', result);
    });

    // clear & npm run node:test -- --test-name-pattern=test1-2 src/client/fetch-adapter.test.ts
    void test('test1-2', async () => {
        const client = createFetchClient(logger);

        type BodyType = {
            userId: string;
            userName: string;
        };

        const body: BodyType = {
            userId: '12345',
            userName: 'test',
        };

        const config: RequestConfig = {
            method: Method.POST,
            url: 'http://api/bff/test',
            bodyJson: body,
            headers: {
                ...CONTENT_TYPE_APPLICATION_JSON_UTF8,
                ...ACCEPT_APPLICATION_JSON,
            },
        };
        const result = await client.send(config);
        console.log(logPrefix, 'result=', result);
    });

    // clear & npm run node:test -- --test-name-pattern=test1-3 src/client/fetch-adapter.test.ts
    void test('test1-3', async () => {
        logger.log(Level.Info, { format: 'test=%s, %s', params: ['test', 'test'] });
        const client = createFetchClient(logger);

        const searchParams = new URLSearchParams();
        searchParams.append('userId', '12345');
        searchParams.append('userName', 'test');

        const config: RequestConfig = {
            method: Method.POST,
            url: 'http://api/bff/test',
            bodyUrlEncoded: searchParams,
            headers: {
                ...CONTENT_TYPE_APPLICATION_FORM,
                ...ACCEPT_APPLICATION_JSON,
            },
            validateStatus: (status) => status < 500,
        };
        console.log(logPrefix, 'config=', config);
        const result = await client.send(config);
        console.log(logPrefix, 'result=', result);
    });
});
