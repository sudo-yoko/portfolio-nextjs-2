import 'client-only';

import client from '@/presentation/_system/client/client.c';
import { FetchData, FetchPage } from '@/presentation/_system/pagination/mvvm/models/pagination.requester';
import { PaginationResult } from '@/presentation/_system/pagination/mvvm/models/pagination.types';
import { parseResult } from '@/presentation/_system/result/result.core.helpers';
import { action } from '@/presentation/users/mvvm/bff/users.action';
import { requestConfig } from '@/presentation/users/mvvm/models/users.config';
import { FormKeys, User, UsersQuery } from '@/presentation/users/mvvm/models/users.types';

/**
 * ServerActions経由バックエンド呼び出し
 */
const _viaAction: FetchPage<User[], FormKeys> = async (offset, limit, formData) => {
    const result = await action(String(offset), String(limit), formData);
    // return parseFromResult<FetchData<User[]>, FormKeys>(result);
    return result as PaginationResult<FetchData<User[]>, FormKeys>;
};

/**
 * RouteHandlers経由バックエンド呼び出し
 */
const viaRoute: FetchPage<User[], FormKeys> = async (offset, limit, formData) => {
    const query: UsersQuery = { offset: String(offset), limit: String(limit) };
    const res = await client.send({
        url: '/api/bff/users/mvvm',
        ...requestConfig(query, formData),
    });
    // const url = '/api/bff/users/mvvm';
    // const res = await client.send({
    // url,
    // method: Method.POST,
    // headers: { ...CONTENT_TYPE_APPLICATION_JSON_UTF8 },
    // body: { offset, limit, query },
    // });
    // return parseFromText<FetchData<User[]>, FormKeys>(res.rawBody);
    const result = parseResult(res.rawBody);
    return result as PaginationResult<FetchData<User[]>, FormKeys>;

    // const res = await window.fetch(url, {
    // method: POST,
    // headers: CONTENT_TYPE_APPLICATION_JSON_UTF8,
    // body: JSON.stringify({ offset, limit, query }),
    // });
    // if (res.status === 200) {
    // const clone = res.clone();
    // const text = await clone.text();
    // const parsed = parseBoundaryResult<FetchPageResult<User[]>, never>(text);
    // if (parsed !== null) {
    // if (isOk(parsed)) {
    // return parsed;
    // }
    // }
    // }
    // const text = await res.text();
    // throw boundaryError(text);
};

export const fetchPage: FetchPage<User[], FormKeys> = viaRoute;
