import 'server-only';

import {
    ACCEPT_APPLICATION_JSON,
    CONTENT_TYPE_APPLICATION_JSON_UTF8,
} from '@/presentation/_system/client/client.constants';
import { queryParam } from '@/presentation/_system/client/client.helpers';
import client from '@/presentation/_system/client/client.s';
import { Method } from '@/presentation/_system/client/client.types';
import { env } from '@/presentation/_system/env/env.helper.validated';
import { FormData } from '@/presentation/_system/validation/validation.types';
import { FormKeys, Users } from '@/presentation/users/mvvm/models/users.types';

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
export async function send(offset: string, limit: string, formData: FormData<FormKeys>): Promise<Users> {
    // const query: UsersQuery = { offset, limit };

    const res = await client.send({
        url: url(),
        method: Method.POST,
        headers: {
            ...CONTENT_TYPE_APPLICATION_JSON_UTF8,
            ...ACCEPT_APPLICATION_JSON,
        },
        // TODO: コンパイルエラー
        query: queryParam({ offset, limit }),
        body: formData,
    });
    const result: Users = JSON.parse(res.rawBody);
    return result;
}
