//
// 外部リクエスト用クライアント（サーバーサイド専用）
//
import 'server-only';

import { envProxySettings } from '@my/env/server';
import logger from '@my/logger/server';

import { createFetchClient } from '#client/internal/isomorphic/adapters/fetch-adapter';
import { Client } from '#client/internal/isomorphic/client.types';
import { createAxiosClient } from '#client/internal/server/adapters/axios-adapter.s';

/**
 * 外部リクエスト用クライアントを取得する（サーバーサイド専用）
 *
 * @param proxy - プロキシ設定されたクライアントを取得する場合true、プロキシ設定無しクライアントを取得する場合false
 * @returns
 */
export function createExternalClient(proxy: boolean): Client {
    return proxy ? proxiedClient() : nonProxiedClient();
}

function proxiedClient(): Client {
    const { protocol, host, port } = envProxySettings();
    return createAxiosClient({ protocol, host, port });
}

function nonProxiedClient(): Client {
    return createFetchClient(logger);
}
