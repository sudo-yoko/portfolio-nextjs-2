import 'server-only';

import {
    ACCEPT_APPLICATION_JSON,
    CONTENT_TYPE_APPLICATION_JSON_UTF8,
} from '@/presentation/_system/client/client.constants';
import { queryParam } from '@/presentation/_system/client/client.helpers';
import client from '@/presentation/_system/client/client.s';
import { Method } from '@/presentation/_system/client/client.types';
import { env } from '@/presentation/_system/env/env.helper.validated';
import { parseResponse, ResUsers } from '@/presentation/err-test/models/err-test.users.parser';

/**
 * バックエンドのアドレス
 */
const url = (): string => {
    const url = env('USERS_API');
    return url;
};

/**
 * バックエンド呼び出し
 */
export async function requestUsers(): Promise<ResUsers> {
    const res = await client.send({
        url: url(),
        method: Method.POST,
        headers: {
            ...CONTENT_TYPE_APPLICATION_JSON_UTF8,
            ...ACCEPT_APPLICATION_JSON,
        },
        query: queryParam({ offset: '1', limit: '10' }),
        body: { keyword: 'aaa' },
    });
    const resUsers = parseResponse(res.rawBody);
    return resUsers;
}
