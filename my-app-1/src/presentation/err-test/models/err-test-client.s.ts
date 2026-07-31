import 'server-only';

import {
    ACCEPT_APPLICATION_JSON,
    CONTENT_TYPE_APPLICATION_JSON_UTF8,
} from '@/presentation/_system/client/client.constants';
import { queryParam } from '@/presentation/_system/client/client.helpers';
import client from '@/presentation/_system/client/client.s';
import { Method } from '@/presentation/_system/client/client.types';
import { env } from '@/presentation/_system/env/env.helper.validated';
import logger from '@/presentation/_system/logging/logger.s';
import { parseUsers, ResUsers } from '@/presentation/err-test/models/err-test.users.parser';

const logPrefix = 'err-test-client.s.ts: ';

/**
 * HealthCheckエンドポイントを実行
 */
// NOTE: このようにすることで、スタックトレースに関数名が出るので追いやすくなる。
export async function requestHealthCheck(): Promise<void> {
    const url = 'http://localhost:3006/healthcheck/internal-server-error';
    logger.info(logPrefix + `url=${url}`);

    const result = await client.send({ url, method: Method.GET });
    logger.info(logPrefix + `status=${result.status}, body=${result.rawBody}`);
}

/**
 * Usersエンドポイントを実行
 */
export async function requestUsers(): Promise<ResUsers> {
    const url = env('USERS_API');

    const res = await client.send({
        url,
        method: Method.POST,
        headers: {
            ...CONTENT_TYPE_APPLICATION_JSON_UTF8,
            ...ACCEPT_APPLICATION_JSON,
        },
        query: queryParam({ offset: '1', limit: '10' }),
        body: { keyword: 'aaa' },
    });
    const resUsers = parseUsers(res.rawBody);
    return resUsers;
}
