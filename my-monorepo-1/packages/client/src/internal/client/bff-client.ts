//
// BFFリクエスト用クライアント
//
import 'client-only';

import { illegalStateError } from '@my/error';
import logger from '@my/logger/client';

import { BffClient, Client, Method, RequestConfig } from '#client/internal/isomophic/client.types';
import { ACCEPT_APPLICATION_JSON, CONTENT_TYPE_APPLICATION_JSON_UTF8 } from '../isomophic/client.constants';

const logPrefix = 'bff-client.ts: ';

/**
 * 引数に渡されたREST API クライアントに、BFFクライアントの仕様を付加したBFFクライアント仕様のクライアントを返す。
 *
 * @param client - REST API クライアント
 * @returns BFFリクエスト用クライアントを返す
 */
export const withBffClientSpec = (client: Client): BffClient => ({
    send: async (config) => {
        logger.info(logPrefix + `Request -> config=${JSON.stringify(config)}`);

        const c: RequestConfig = {
            method: Method.POST,
            url: config.url,
        };
        // c.body = config.body // TODO
        c.headers = {
            ...CONTENT_TYPE_APPLICATION_JSON_UTF8,
            ...ACCEPT_APPLICATION_JSON,
        };

        // const result = fetchClient(logger).send(config);
        const result = client.send(c);
        logger.info(logPrefix + `Response -> ${JSON.stringify(result)}`);
        return result;

        // if (config.method !== Method.POST) {
        //     throw illegalStateError({ message: 'BFFリクエストエラー。POSTのみ指定できます。' });
        // }
        // if (config.query) {
        //     throw illegalStateError({ message: 'BFFリクエストエラー。クエリ文字列は使用できません。' });
        // }
        // if (config.path) {
        //     throw illegalStateError({ message: 'BFFリクエストエラー。パスパラメーターは使用できません。' });
        // }
        // if (config.validateStatus) {
        //     throw illegalStateError({
        //         message: 'BFFリクエストエラー。ステータスコードチェックは利用できません。',
        //     });
        // }

        // try {
        //     // リクエスト設定
        //     const fetchConfig: RequestInit = {};
        //     fetchConfig.method = config.method;
        //     fetchConfig.headers = config.headers;
        //     if (config.body) {
        //         fetchConfig.body = JSON.stringify(config.body); // オブジェクトをJSON.stringifyして渡す
        //     }
        //     if (config.timeout) {
        //         fetchConfig.signal = AbortSignal.timeout(config.timeout);
        //     }
        //     // NOTE: BFFリクエストでは相対パス指定を可能とするため new URL はしない
        //     // const url = new URL(config.url);

        //     // リクエスト実行
        //     const res = await fetch(config.url, fetchConfig);

        //     // レスポンス
        //     const rawBody = await res.text(); // bodyがjsonとは限らないのでtextで取得する。エラーの場合はhtmlが返ってくることもある
        //     const result: RawResponse = {
        //         status: res.status,
        //         rawBody,
        //     };
        //     logger.info(logPrefix + `Response -> ${JSON.stringify(result)}`);
        //     return result;
        // } catch (error) {
        //     // NOTE: クライント側エラーはTypeErrorになる

        //     // エラー情報
        //     const location = 'fetchClient.send';
        //     const option = getCustomErrorProperties(error);
        //     const details = { config, option };

        //     // エラーログ出力
        //     const { all, message, name } = formatError({ error, location, details });
        //     logger.error(logPrefix + all);

        //     // 発生したエラーをApplicationErrorにラップして再スロー
        //     throw applicationError({
        //         message: 'BFFリクエストで失敗しました。',
        //         cause: error,
        //         location: logPrefix + location,
        //         extra: { ...details, cause: { name, message, ...option } },
        //     });
        // }
    },
});
