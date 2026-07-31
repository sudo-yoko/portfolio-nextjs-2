import 'client-only';

import client from '@/presentation/_system/client/client.c';
import { Method, RawResponse } from '@/presentation/_system/client/client.types';
import { parseResult } from '@/presentation/_system/result/result.helpers';
import { BffResult } from '@/presentation/_system/result/result.types';
import { post } from '@/presentation/err-test/bff/err-test.action';
import { ErrTestResult, UsersResult } from '@/presentation/err-test/models/err-test.types';
import { ResUsers } from '@/presentation/err-test/models/err-test.users.parser';

type Send = {
    (): Promise<BffResult<ErrTestResult>>;
};

const viaRoute: Send = async () => {
    const res: RawResponse = await client.send({
        url: '/api/bff/err-test',
        method: Method.GET,
    });
    // TODO: レスポンスボディが無い時もこれが必要なのか？
    // →必要。BFFのリクエストの場合は、rawBodyはRESULT型の値のため。
    const result = parseResult(res.rawBody);
    return result as ErrTestResult;
};

const viaAction: Send = async () => {
    const result = await post();
    return result as ErrTestResult;
};

/**
 * クライアント側エラーが起こる
 */
const viaRouteClientError: Send = async () => {
    const res: RawResponse = await client.send({
        url: 'httpp::::////api/bff/err-test',
        method: Method.GET,
    });
    // TODO: レスポンスボディが無い時もこれが必要なのか？
    // →必要。BFFのリクエストの場合は、rawBodyはRESULT型の値のため。
    const result = parseResult(res.rawBody);
    return result as ErrTestResult;
};

export const sendViaRoute: Send = viaRoute;
export const sendViaAction: Send = viaAction;
export const sendViaRouteClientError: Send = viaRouteClientError;

type UsersRequest = (err: string) => Promise<BffResult<UsersResult<ResUsers>>>;

const requestUsersViaRoute: UsersRequest = async (err) => {
    const res: RawResponse = await client.send({
        url: '/api/bff/err-test',
        method: Method.GET,
        query: [{ key: 'err', value: err }],
    });
    const result = parseResult(res.rawBody);
    return result as UsersResult<ResUsers>;
};

export const requestUsers: UsersRequest = requestUsersViaRoute;
