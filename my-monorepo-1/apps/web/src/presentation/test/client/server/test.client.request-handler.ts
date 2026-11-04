import 'server-only';

import { Method, RequestConfig } from '@my/client';
import { backendClient } from '@my/client/server';
import logger from '@my/logger/server';
import { Level } from '@my/logger';

const logPrefix = 'test.client.request-handler.ts: ';

export async function handleRequest() {
    const searchParams = new URLSearchParams();
    searchParams.append('userId', '12345');
    searchParams.append('userName', 'test');

    const config: RequestConfig = {
        method: Method.GET,
        url: 'http://test',
        bodyUrlEncoded: searchParams,
    };

    logger.log(Level.Info, { format: logPrefix + `config=%o`, params: [config] });

    const result = await backendClient.send(config);

    logger.info(logPrefix + `result=${result}`);
}
