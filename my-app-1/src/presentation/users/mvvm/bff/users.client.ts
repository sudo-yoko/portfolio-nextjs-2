import 'server-only';

import client from '@/presentation/(system)/client/client.s';
import { Method } from '@/presentation/(system)/client/client.types';
import { env } from '@/presentation/(system)/env/env.helper.validated';
import { Users, UsersQuery } from '@/presentation/users/mvvm/models/users.types';

// type RES = {
// total: number;
// users: {
// userId: string;
// userName: string;
// }[];
// };

export async function send(offset: number, limit: number, query: UsersQuery): Promise<Users> {
    const url = env('USERS_API');
    // const res = await client.get<RES>(url, { params: { offset, limit, ...query } });

    const res = await client.send({
        method: Method.GET,
        url,
        params: { offset, limit, ...query },
    });

    const result: Users = JSON.parse(res.rawBody);
    return result;
}
