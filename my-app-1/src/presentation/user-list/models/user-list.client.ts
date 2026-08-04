import 'client-only';

import client from '@/presentation/_system/client/client.c';
import {
    ACCEPT_APPLICATION_JSON,
    CONTENT_TYPE_APPLICATION_JSON_UTF8,
} from '@/presentation/_system/client/client.constants';
import { Method } from '@/presentation/_system/client/client.types';
import { parseResult } from '@/presentation/_system/result/result.parser';
import { BffResult } from '@/presentation/_system/result/result.types';
import { toQueryParams } from '@/presentation/_system/types/search-params';
import { FormData } from '@/presentation/_system/validation/validation.types';
import { FormKeys, UserListResult } from '@/presentation/user-list/models/user-list.types';

type FetchData = (limit: number, formData: FormData<FormKeys>) => Promise<BffResult<UserListResult>>;

const viaRoute: FetchData = async (limit, formData) => {
    const res = await client.send({
        url: '/api/bff/user-list',
        method: Method.POST,
        headers: {
            ...CONTENT_TYPE_APPLICATION_JSON_UTF8,
            ...ACCEPT_APPLICATION_JSON,
        },
        query: toQueryParams({ offset: '1', limit: String(limit) }), // TODO: 型名Formはこのケースでおかしい
        body: formData,
    });
    const result = parseResult(res.rawBody);
    return result as BffResult<UserListResult>;
};

export const fetchData: FetchData = viaRoute;
