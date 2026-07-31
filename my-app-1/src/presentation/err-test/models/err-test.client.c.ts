import 'client-only';

import client from '@/presentation/_system/client/client.c';
import { Method, RawResponse } from '@/presentation/_system/client/client.types';

import { parseResult } from '@/presentation/_system/result/result.parser';
import { BffResult } from '@/presentation/_system/result/result.types';
import { post } from '@/presentation/err-test/bff/err-test.action';
import { HealthCheckResult, UsersResult } from '@/presentation/err-test/models/err-test.types';
import { ResUsers } from '@/presentation/err-test/models/err-test.users.parser';

//
// HealthCheckリクエスト
//
type HealthCheckRequest = {
    (): Promise<BffResult<HealthCheckResult>>;
};

const viaRoute: HealthCheckRequest = async () => {
    const res: RawResponse = await client.send({
        url: '/api/bff/err-test',
        method: Method.GET,
    });
    // TODO: レスポンスボディが無い時もこれが必要なのか？
    // →必要。BFFのリクエストの場合は、rawBodyはRESULT型の値のため。
    const result = parseResult(res.rawBody);
    return result as HealthCheckResult;
};

const viaAction: HealthCheckRequest = async () => {
    const result = await post();
    return result as HealthCheckResult;
};

/**
 * クライアント側エラーが起こる
 */
const viaRouteClientError: HealthCheckRequest = async () => {
    const res: RawResponse = await client.send({
        url: 'httpp::::////api/bff/err-test',
        method: Method.GET,
    });
    // TODO: レスポンスボディが無い時もこれが必要なのか？
    // →必要。BFFのリクエストの場合は、rawBodyはRESULT型の値のため。
    const result = parseResult(res.rawBody);
    return result as HealthCheckResult;
};

export const sendViaRoute: HealthCheckRequest = viaRoute;
export const sendViaAction: HealthCheckRequest = viaAction;
export const sendViaRouteClientError: HealthCheckRequest = viaRouteClientError;

//
// Usersリクエスト
//
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
