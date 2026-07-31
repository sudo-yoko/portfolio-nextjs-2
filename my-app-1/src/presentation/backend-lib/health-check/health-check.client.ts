import 'server-only';

import client from '@/presentation/_system/client/client.s';
import { Method } from '@/presentation/_system/client/client.types';
import logger from '@/presentation/_system/logging/logger.s';

const logPrefix = 'health-check-client.ts: ';

export async function requestHealthCheckError(): Promise<void> {
    const url = 'http://localhost:3006/healthcheck/internal-server-error';
    requestHealthCheck(url);
}

export async function requestHealthCheckOk(): Promise<void> {
    const url = 'http://localhost:3006/healthcheck';
    requestHealthCheck(url);
}

async function requestHealthCheck(url: string): Promise<void> {
    logger.info(logPrefix + `url=${url}`);
    const result = await client.send({ url, method: Method.GET });
    logger.info(logPrefix + `status=${result.status}, body=${result.rawBody}`);
}
