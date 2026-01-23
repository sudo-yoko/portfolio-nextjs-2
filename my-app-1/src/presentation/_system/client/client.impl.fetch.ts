//
// API クライアントの実装 ( Fetch API )
// クライアントサイド -> BFF(APIルート)のリクエストで使用する
//
import 'client-only';

import { Client, RequestConfig, Result } from '@/presentation/_system/client/client.types';
import { httpRequestError, httpResponseError } from '@/presentation/_system/error/error.factories';
import { stringify } from '@/presentation/_system/error/error.helper.stringify';
import logger from '@/presentation/_system/logging/logger.c';

const logPrefix = 'client.impl.fetch.ts: ';

export const clientImpl: Client = {
    send: async <BODY = never, PARAMS = never>(config: RequestConfig<BODY, PARAMS>) => {
        logger.info(logPrefix + `config=${JSON.stringify(config)}`);
        // クライアントサイド -> BFF(APIルート)間リクエストでは、ステータスコード200のみとする。
        // エラーの場合はレスポンスボディにエラー情報を設定する
        // 200以外が返ってきたら例外をスローする
        const validateStatus = config.validateStatus ?? ((status: number) => status === 200);

        let res;
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

        // ステータスコードの検証
        if (!validateStatus(res.status)) {
            const err = httpResponseError({ status: res.status, body: await res.text() }); // TODO: ボディは100文字くらいでカットする
            // const err = backendApiError(
            // `Request -> ${JSON.stringify(req)}, Response -> status=${res.status}`,
            // );
            logger.error(logPrefix + err.message);
            throw err;
        }

        const rawBody = await res.text(); // bodyがjsonとは限らないのでtextで取得する。エラーの場合はhtmlが返ってくることもある
        const result: Result = {
            status: res.status,
            rawBody,
        };
        logger.info(logPrefix + `Request -> ${JSON.stringify(config)}, Result -> ${JSON.stringify(result)}`);
        return result;
    },
};
