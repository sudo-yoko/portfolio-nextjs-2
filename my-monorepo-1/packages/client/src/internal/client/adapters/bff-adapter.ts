//
// BFFリクエスト用クライアント
//
import 'client-only';

import logger from '@my/logger/client';

import {
    ACCEPT_APPLICATION_JSON,
    CONTENT_TYPE_APPLICATION_JSON_UTF8,
} from '#client/internal/isomophic/client.constants';
import { BffClient, Client, Method } from '#client/internal/isomophic/client.types';

const logPrefix = 'bff-adapter.ts: ';

/**
 * 引数に渡されたHTTPクライアントに、BFFクライアント固有のルールを適用する。
 *
 * @param client - HTTPクライアント
 * @returns BFFリクエスト用クライアントを返す
 */
export const createBffClient = (client: Client): BffClient => ({
    send: async (config) => {
        logger.info(logPrefix + `Request -> config=${JSON.stringify(config)}`);
        const result = await client.send({
            method: Method.POST,
            url: config.url,
            body: config.body,
            headers: {
                ...CONTENT_TYPE_APPLICATION_JSON_UTF8,
                ...ACCEPT_APPLICATION_JSON,
            },
        });
        logger.info(logPrefix + `Response -> ${JSON.stringify(result)}`);
        return result;
    },
});
