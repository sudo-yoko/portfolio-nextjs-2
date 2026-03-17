//
// Fetch API を Client インターフェースに適合させるアダプター
//
import { Client, RequestConfig, Result, ValidateStatus } from '@/presentation/_system/client/client.types';
import { httpRequestError, httpResponseError } from '@/presentation/_system/error/error.factories';
import { stringify } from '@/presentation/_system/error/error.helper.stringify';
import { Logger } from '@/presentation/_system/logging/logging.types';

const logPrefix = 'client.adapter.fetch.ts: ';

//export const fetchAdapter: Client = {
export const createFetchClient = (logger: Logger, defaultValidateStatus: ValidateStatus): Client => ({
    send: async <BODY = never, QUERY = never>(config: RequestConfig<BODY, QUERY>) => {
        // TODO: ログ出力を抑止する機能
        logger.info(logPrefix + `config=${JSON.stringify(config)}`);
        const validateStatus = config.validateStatus ?? defaultValidateStatus;
        //
        // リクエスト
        //
        let res: Response;
        try {
            let url: string = '';
            if (config.query) {
                const query = new URLSearchParams(config.query);
                url = config.url + `?${query}`;
            } else {
                url = config.url;
            }
            logger.info(logPrefix + `url=${url}`);

            res = await fetch(url, {
                method: config.method,
                headers: config.headers,
                // TODO: GETリクエストではボディは送らない
                body: JSON.stringify(config.body), // オブジェクトをJSON.stringifyして渡す
            });
        } catch (e) {
            logger.error(logPrefix + stringify(e).message);
            if (e instanceof TypeError) {
                // ブラウザ環境では通信エラー（クライント側エラー）はTypeErrorになる？
                throw httpRequestError({ cause: e, detail: `request=${JSON.stringify(config)}` });
            }
            throw httpRequestError({ cause: e, detail: `request=${JSON.stringify(config)}` });
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
            const err = httpResponseError({ status: result.status, body: result.rawBody }); // TODO: ボディは100文字くらいでカットする
            // const err = backendApiError(
            // `Request -> ${JSON.stringify(req)}, Response -> status=${res.status}`,
            // );
            logger.error(logPrefix + err.message);
            throw err;
        }
        logger.info(logPrefix + `Request -> ${JSON.stringify(config)}, Result -> ${JSON.stringify(result)}`);
        return result;
    },
    //};
});
