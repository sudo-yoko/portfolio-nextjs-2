//
// Fetch API を Client インターフェースに適合させるアダプター
// Node.js の global fetch を使用
// APIクライアント（global fetch版）
//
import { Client, Result, ValidateStatus } from '@/presentation/_system/client/client.types';
import { apiError, invalidStatusError } from '@/presentation/_system/error/error.factories';
import { getCustomErrorProperties, stringify } from '@/presentation/_system/error/error.helper.stringify';
import { Logger } from '@/presentation/_system/logging/logging.types';

const logPrefix = 'client.adapter.fetch.ts: ';

export const createFetchClient = (logger: Logger, defaultValidateStatus: ValidateStatus): Client => ({
    send: async (config) => {
        // TODO: ログ出力を抑止する機能
        logger.info(logPrefix + `Request -> config=${JSON.stringify(config)}`);
        const validateStatus = config.validateStatus ?? defaultValidateStatus;
        try {
            //
            // リクエスト設定
            //
            const fetchConfig: RequestInit = {};
            fetchConfig.method = config.method;
            fetchConfig.headers = config.headers;
            if (config.body) {
                fetchConfig.body = JSON.stringify(config.body); // オブジェクトをJSON.stringifyして渡す
            }
            if (config.timeout) {
                fetchConfig.signal = AbortSignal.timeout(config.timeout);
            }
            // TODO: URLが相対パスの形式だと失敗する。相対パスの場合は第二引数にwindow.location.originを指定すること
            // const url = new URL(config.url);
            const url = URL.canParse(config.url)
                ? new URL(config.url)
                : new URL(config.url, window.location.origin); // TODO: window.はnode環境だと動かないので、fetchはCL/SV共用しない方が良い
            config.query?.forEach(({ key, value }) => url.searchParams.append(key, value));
            //
            // リクエスト実行
            //
            const res = await fetch(url, fetchConfig);
            //
            // レスポンス
            //
            const rawBody = await res.text(); // bodyがjsonとは限らないのでtextで取得する。エラーの場合はhtmlが返ってくることもある
            const result: Result = {
                status: res.status,
                rawBody,
            };
            logger.info(logPrefix + `Response -> ${JSON.stringify(result)}`);
            //
            // ステータスコードの検証
            //
            if (!validateStatus(result.status)) {
                throw invalidStatusError({ status: result.status, body: result.rawBody }); // TODO: ボディは100文字くらいでカットする?
            }
            return result;
        } catch (e) {
            // NOTE: クライント側エラーはTypeErrorになる
            const details = getCustomErrorProperties(e);
            logger.error(logPrefix + stringify({ error: e, details }).all);
            throw apiError({ cause: e });
        }
    },
});
