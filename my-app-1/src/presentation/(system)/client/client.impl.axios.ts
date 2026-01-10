//
// API クライアントの実装 ( Axios )
// BFF -> バックエンドAPIのリクエストで使用する
//
import 'server-only';

import { client } from '@/presentation/(system)/client/client.core.axios';
import { Client, Req, Result } from '@/presentation/(system)/client/client.types';
import logger from '@/presentation/(system)/logging/logger.s';

const logPrefix = 'client.impl.axios.ts: ';

export const clientImpl: Client = {
    send: async <BODY = never, PARAMS = never>(req: Req<BODY, PARAMS>) => {
        // デフォルトは、500 以上のステータスコードの場合はエラーをスローする
        const validateStatus = req.validateStatus ?? ((status: number) => status < 500);

        logger.info(logPrefix + req.url);
        logger.info(logPrefix + req.body);
        const res = await client.request({
            method: req.method,
            url: req.url,
            params: req.params,
            validateStatus,
            // TODO: リクエストボディ
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
        logger.info(logPrefix + `Request -> ${JSON.stringify(req)}, Result -> ${JSON.stringify(result)}`);
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
    throw Error();
}
