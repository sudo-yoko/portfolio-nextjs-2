//
// API クライアントの実装 ( Axios )
// BFF -> バックエンドAPIのリクエストで使用する
//
import 'server-only';

import { client } from '@/presentation/_system/client/client.core.axios';
import { Client, RequestConfig, Result } from '@/presentation/_system/client/client.types';
import logger from '@/presentation/_system/logging/logger.s';

const logPrefix = 'client.impl.axios.ts: ';

export const clientImpl: Client = {
    send: async <BODY = never, PARAMS = never>(config: RequestConfig<BODY, PARAMS>) => {
        // デフォルトは、500 以上のステータスコードの場合はエラーをスローする
        const validateStatus = config.validateStatus ?? ((status: number) => status < 500);

        logger.info(logPrefix + config.url);
        logger.info(logPrefix + config.body);
        const res = await client.request({
            method: config.method,
            url: config.url,
            params: config.query,
            data: config.body,
            validateStatus,
        });

        // ステータスコードの検証
        // if (!validateStatus(res.status)) {
        // const err = backendApiError(`Request -> ${JSON.stringify(req)}, Response -> status=${res.status}`);
        // logger.error(logPrefix + err.message);
        // throw err;
        // }

        const result: Result = {
            status: res.status,
            rawBody: toStringSafe(res.data),
        };
        logger.info(logPrefix + `Request -> ${JSON.stringify(config)}, Result -> ${JSON.stringify(result)}`);
        return result;
    },
};

function toStringSafe(value: unknown): string {
    if (typeof value === 'string') {
        return value;
    }
    if (value != null && typeof value === 'object') {
        return JSON.stringify(value);
    }
    // TODO: カスタムエラー
    throw Error();
}
