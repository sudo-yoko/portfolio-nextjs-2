import 'server-only';

import {
    ACCEPT_APPLICATION_JSON,
    CONTENT_TYPE_APPLICATION_JSON_UTF8,
} from '@/presentation/_system/client/client.constants';
import { queryParam } from '@/presentation/_system/client/client.helpers';
import client from '@/presentation/_system/client/client.s';
import { Method } from '@/presentation/_system/client/client.types';
import { env } from '@/presentation/_system/env/env.helper.validated';
import { parseUsers } from '@/presentation/backend-lib/users/users.parser';
import { Users } from '@/presentation/backend-lib/users/users.types';

export async function requestUsers(keyword: string, offset: string, limit: string): Promise<Users> {
    const url = env('USERS_API');

    const res = await client.send({
        url,
        method: Method.POST,
        headers: {
            ...CONTENT_TYPE_APPLICATION_JSON_UTF8,
            ...ACCEPT_APPLICATION_JSON,
        },
        query: queryParam({ offset, limit }),
        body: { keyword },
    });
    const resUsers = parseUsers(res.rawBody);
    const users: Users = {
        ...resUsers,
        total: Number(resUsers.total),
    };
    return users;
}
