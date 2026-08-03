import 'server-only';

import {
    ACCEPT_APPLICATION_JSON,
    CONTENT_TYPE_APPLICATION_JSON_UTF8,
} from '@/presentation/_system/client/client.constants';
import client from '@/presentation/_system/client/client.s';
import { Method } from '@/presentation/_system/client/client.types';
import { env } from '@/presentation/_system/env/env.helper.validated';
import { toQueryParams } from '@/presentation/_system/types/search-params';
import { parseUsers } from '@/presentation/backend-lib/users/users.parser';
import { Users, UsersRequest } from '@/presentation/backend-lib/users/users.types';

export async function requestUsers(req: UsersRequest): Promise<Users> {
    const url = env('USERS_API');
    const { keyword, offset, limit } = req;

    const res = await client.send({
        url,
        method: Method.POST,
        headers: {
            ...CONTENT_TYPE_APPLICATION_JSON_UTF8,
            ...ACCEPT_APPLICATION_JSON,
        },
        query: toQueryParams({ offset, limit }),
        body: { keyword },
    });
    const resUsers = parseUsers(res.rawBody);
    const users: Users = {
        ...resUsers,
        total: Number(resUsers.total),
    };
    return users;
}
