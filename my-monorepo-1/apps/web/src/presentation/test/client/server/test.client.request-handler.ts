import 'server-only';

import { ACCEPT_APPLICATION_JSON, Method, RequestConfig, toQueryParams } from '@my/client';
import { createExternalClient } from '@my/client/server';
import { Level } from '@my/logger';
import logger from '@my/logger/server';

const logPrefix = 'test.client.request-handler.ts: ';

export async function handleRequest() {
    // const searchParams = new URLSearchParams();
    // searchParams.append('userId', '12345');
    // searchParams.append('userName', 'test');

    const config: RequestConfig = {
        method: Method.GET,
        url: 'https://zipcloud.ibsnet.co.jp/api/search',
        query: toQueryParams({ zipcode: '100-0001', limit: '10' }),
        // bodyUrlEncoded: searchParams,
        headers: {
            ...ACCEPT_APPLICATION_JSON,
        },
    };
    logger.log(Level.Info, { format: logPrefix + 'config=%o', params: [config] });

    const externalClient = createExternalClient(false);
    const result = await externalClient.send(config);
    logger.info(logPrefix + `result=${JSON.stringify(result)}`);

    const json = JSON.parse(result.rawBody);
    logger.info(logPrefix + `result=${JSON.stringify(json)}`);
    logger.log(Level.Info, { format: logPrefix + 'result=%o', params: [json] });
}
