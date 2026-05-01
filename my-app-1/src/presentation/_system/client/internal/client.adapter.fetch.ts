//
// Fetch API を Client インターフェースに適合させるアダプター
// Node.js の global fetch を使用
// APIクライアント（global fetch版）
//
import { Client, Result, ValidateStatus } from '@/presentation/_system/client/client.types';
import { apiError, invalidStatusError } from '@/presentation/_system/error/error.factories';
import { stringify } from '@/presentation/_system/error/error.helper.stringify';
import { Logger } from '@/presentation/_system/logging/logging.types';

const logPrefix = 'client.adapter.fetch.ts: ';

//export const fetchAdapter: Client = {
export const createFetchClient = (logger: Logger, defaultValidateStatus: ValidateStatus): Client => ({
    send: async (config) => {
        // TODO: ログ出力を抑止する機能
        logger.info(logPrefix + `config=${JSON.stringify(config)}`);
        const validateStatus = config.validateStatus ?? defaultValidateStatus;
        //
        // リクエスト
        //
        let res: Response;
        try {
            // let url: string = '';
            // if (config.query) {
            //     const query = new URLSearchParams(config.query);
            //     url = config.url + `?${query}`;
            // } else {
            //     url = config.url;
            // }
            // logger.info(logPrefix + `url=${url}`);
            const url = new URL(config.url);
            config.query?.forEach(({ key, value }) => url.searchParams.append(key, value));

            const fetchConfig: RequestInit = {};
            fetchConfig.method = config.method;
            fetchConfig.headers = config.headers;
            if (config.body) {
                fetchConfig.body = JSON.stringify(config.body); // オブジェクトをJSON.stringifyして渡す
            }
            res = await fetch(url, fetchConfig);
            // res = await fetch(url, {
            //     method: config.method,
            //     headers: config.headers,
            //     // TODO: GETリクエストではボディは送らない
            //     body: JSON.stringify(config.body), // オブジェクトをJSON.stringifyして渡す
            // });
        } catch (e) {
            logger.error(logPrefix + stringify({ error: e }).all);
            throw apiError({ cause: e });
            // if (e instanceof TypeError) {
            //     // ブラウザ環境では通信エラー（クライント側エラー）はTypeErrorになる？
            //     throw ApiError({ cause: e, detail: `request=${JSON.stringify(config)}` });
            // }
            // throw ApiError({ cause: e, detail: `request=${JSON.stringify(config)}` });
        }
        //
        // レスポンス
        //
        const rawBody = await res.text(); // bodyがjsonとは限らないのでtextで取得する。エラーの場合はhtmlが返ってくることもある
        const result: Result = {
            status: res.status,
            rawBody,
        };
        // ステータスコードの検証
        if (!validateStatus(result.status)) {
            const cause = invalidStatusError({ status: result.status, body: rawBody });
            logger.info(logPrefix + stringify({ error: cause }).all);
            throw apiError({ cause }); // TODO: ボディは100文字くらいでカットする
            // const err = backendApiError(
            // `Request -> ${JSON.stringify(req)}, Response -> status=${res.status}`,
            // );
            // logger.error(logPrefix + err.message);
            // throw err;
        }
        logger.info(logPrefix + `Request -> ${JSON.stringify(config)}, Result -> ${JSON.stringify(result)}`);
        return result;
    },
    //};
});
