//
// Axios インスタンスを Client インターフェースに適合させるアダプター
//
import { AxiosInstance } from 'axios';

import { Client, RequestConfig, Result } from '@/presentation/_system/client/client.types';
import { Logger } from '@/presentation/_system/logging/logging.types';

const logPrefix = 'client.adapter.axios.ts: ';

// NOTE: const func = (arg) => ({ ... }) （オブジェクトの暗黙的返却）
export const createAxiosClient = (axiosInstance: AxiosInstance, logger: Logger): Client => ({
    // export const clientImpl: Client = {
    send: async <BODY = never, QUERY = never>(config: RequestConfig<BODY, QUERY>) => {
        logger.info(logPrefix + `config=${JSON.stringify(config)}`);

        // デフォルトは、500 以上のステータスコードの場合はエラーをスローする
        const validateStatus = config.validateStatus ?? ((status: number) => status < 500);

        logger.info(logPrefix + config.url);
        logger.info(logPrefix + config.body);
        const res = await axiosInstance.request({
            method: config.method,
            url: config.url,
            params: config.query,
            data: config.body,
            validateStatus,
        });

        // TODO: axiosの場合の通信エラー（クライアント側エラーは？）

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
    // };
});

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
