//
// FetchAPI アダプター
// BFFリクエスト用
//
import 'client-only';

import { applicationError, formatError, getCustomErrorProperties, illegalStateError } from '@my/error';
import logger from '@my/logger/client';

import { Client, Method, RawResponse } from '#client/internal/isomophic/client.types';

const logPrefix = 'fetch-adapter.c.ts: ';

export const bffFetchClient = (): Client => ({
    send: async (config) => {
        logger.info(logPrefix + `Request -> config=${JSON.stringify(config)}`);

        // if (config.method !== Method.GET) {
        //     throw illegalStateError({ message: 'BFFリクエストエラー。GETのみ指定できます。' });
        // }
        // if (config.query) {
        //     throw illegalStateError({ message: 'BFFリクエストエラー。クエリ文字列は使用できません。' });
        // }
        if (config.path) {
            throw illegalStateError({ message: 'BFFリクエストエラー。パスパラメーターは使用できません。' });
        }
        if (config.validateStatus) {
            throw illegalStateError({
                message: 'BFFリクエストエラー。ステータスコードチェックは利用できません。',
            });
        }

        try {
            // リクエスト設定
            const fetchConfig: RequestInit = {};
            fetchConfig.method = config.method;
            fetchConfig.headers = config.headers;
            if (config.body) {
                fetchConfig.body = JSON.stringify(config.body); // オブジェクトをJSON.stringifyして渡す
            }
            if (config.timeout) {
                fetchConfig.signal = AbortSignal.timeout(config.timeout);
            }
            // NOTE: BFFリクエストでは相対パス指定を可能とするため new URL はしない
            // const url = new URL(config.url);

            // リクエスト実行
            const res = await fetch(config.url, fetchConfig);

            // レスポンス
            const rawBody = await res.text(); // bodyがjsonとは限らないのでtextで取得する。エラーの場合はhtmlが返ってくることもある
            const result: RawResponse = {
                status: res.status,
                rawBody,
            };
            logger.info(logPrefix + `Response -> ${JSON.stringify(result)}`);
            return result;
        } catch (error) {
            // NOTE: クライント側エラーはTypeErrorになる

            // エラー情報
            const location = 'fetchClient.send';
            const option = getCustomErrorProperties(error);
            const details = { config, option };

            // エラーログ出力
            const { all, message, name } = formatError({ error, location, details });
            logger.error(logPrefix + all);

            // 発生したエラーをApplicationErrorにラップして再スロー
            throw applicationError({
                message: 'BFFリクエストで失敗しました。',
                cause: error,
                location: logPrefix + location,
                extra: { ...details, cause: { name, message, ...option } },
            });
        }
    },
});
