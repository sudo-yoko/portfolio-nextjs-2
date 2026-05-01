import 'server-only';

import { fetch, ProxyAgent, Response } from 'undici';

import { createClient } from '@/presentation/_system/client/client.factory.s';
import { Method, QueryParam } from '@/presentation/_system/client/client.types';
import logger from '@/presentation/_system/logging/logger.s';

const logPrefix = 'healthcheck.handler.request.ts: ';

export async function handleRequest(): Promise<string> {
    return await handleRequestNode2();
}

async function handleRequestNode2(): Promise<string> {
    // const url = 'http://localhost:1111/healthcheck';
    const url = 'http://localhost:3003/users';
    // const proxyUrl = 'http://localhost:9998';
    // logger.info(logPrefix + `proxyUrl=${proxyUrl}, url=${url}`);

    const query: QueryParam = [
        { key: 'offset', value: '4' },
        { key: 'limit', value: '10' },
    ];

    const client = await createClient('axios-proxy');
    const result = await client.send({ url, method: Method.GET, query, timeout: 5000 });
    return result.rawBody;
}

async function _handleRequestUndici(): Promise<void> {
    const proxyUrl = 'http://localhost:9998';
    const address = 'http://localhost:3006/healthcheck';
    logger.info(logPrefix + `proxyUrl=${proxyUrl}, url=${address}`);

    const proxyAgent = new ProxyAgent(proxyUrl);
    const res: Response = await fetch(address, {
        dispatcher: proxyAgent,
        method: Method.GET,
        signal: AbortSignal.timeout(5000),
    });
    logger.info(logPrefix + `status=${res.status}`);
}
