//
// Axios インスタンスを Client インターフェースに適合させるアダプター
//
import { AxiosInstance } from 'axios';

import { Logger } from '@/presentation/_system/logging/logging.types';
import { Client, RequestConfig, Result, ValidateStatus } from '@/presentation/_system/client/client.types';

const logPrefix = 'client.adapter.axios.ts: ';

// NOTE: const func = (arg) => ({ ... }) （オブジェクトの暗黙的返却）
export const createAxiosClient = (
    axiosInstance: AxiosInstance,
    logger: Logger,
    defaultValidateStatus: ValidateStatus,
): Client => ({
    // export const clientImpl: Client = {
    send: async <BODY = never, QUERY = never>(config: RequestConfig<BODY, QUERY>) => {
        logger.info(logPrefix + `config=${JSON.stringify(config)}`);
        logger.info(logPrefix + config.url);
        logger.info(logPrefix + config.body);
        const res = await axiosInstance.request({
            method: config.method,
            url: config.url,
            params: config.query,
            data: config.body,
            validateStatus: config.validateStatus ?? defaultValidateStatus,
        });

        // TODO: axiosの場合の通信エラー（クライアント側エラーは？）AxiosErrorか

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

/**
 * 型不明なオブジェクトを安全にstringにする
 */
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
