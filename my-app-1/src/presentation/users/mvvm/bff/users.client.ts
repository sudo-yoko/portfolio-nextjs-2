import 'server-only';

import client from '@/presentation/_system/client/client.s';
import { env } from '@/presentation/_system/env/env.helper.validated';
import { FormData } from '@/presentation/_system/validation/validation.types';
import { requestConfig } from '@/presentation/users/mvvm/models/users.config';
import { FormKeys, Users, UsersQuery } from '@/presentation/users/mvvm/models/users.types';

export async function send(offset: string, limit: string, formData: FormData<FormKeys>): Promise<Users> {
    const url = env('USERS_API');
    const query: UsersQuery = { offset, limit };
    const res = await client.send({ url, ...requestConfig(query, formData) });
    const result: Users = JSON.parse(res.rawBody);
    return result;
}
