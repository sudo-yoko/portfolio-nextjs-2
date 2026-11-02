//
// fetch API アダプター
//
import { applicationError, formatError, getCustomErrorProperties, invalidStatusError } from '@my/error';
import { Logger } from '@my/logger';

import { defaultValidateStatus } from '#client/internal/isomorphic/client.constants';
import { validateRequestConfig } from '#client/internal/isomorphic/client.helper';
import { Client, RawResponse } from '#client/internal/isomorphic/client.types';

const logPrefix = 'fetch-adapter.ts ';

export const createFetchClient = (logger: Logger): Client => ({
    send: async (config) => {
        logger.info(logPrefix + `Request -> config=${JSON.stringify(config)}`);
        validateRequestConfig(config);

        try {
            // リクエスト設定
            const fetchConfig: RequestInit = {};
            fetchConfig.method = config.method;

            let url: URL | string = config.url;
            if (config.query) {
                // NOTE: クエリパラメーターが指定されている場合は、urlは絶対URLであること。相対URLだとエラーになるので注意
                const parsed = new URL(config.url);
                config.query.forEach(({ key, value }) => parsed.searchParams.append(key, value));
                url = parsed;
            }
            if (config.timeout) {
                fetchConfig.signal = AbortSignal.timeout(config.timeout);
            }
            if (config.bodyJson !== undefined) {
                fetchConfig.body = JSON.stringify(config.bodyJson); // オブジェクトをJSON.stringifyして渡す
            } else if (config.bodyUrlEncoded !== undefined) {
                fetchConfig.body = config.bodyUrlEncoded;
            }

            // リクエスト実行
            const res = await fetch(url, fetchConfig);

            // レスポンス
            const rawBody = await res.text(); // bodyがjsonとは限らないのでtextで取得する。エラーの場合はhtmlが返ってくることもある
            const result: RawResponse = {
                status: res.status,
                rawBody,
            };
            logger.info(logPrefix + `Response -> ${JSON.stringify(result)}`);

            // ステータスコードの検証
            const validateStatus = config.validateStatus ?? defaultValidateStatus;
            if (!validateStatus(result.status)) {
                throw invalidStatusError({ status: result.status, body: result.rawBody }); // TODO: ボディは100文字くらいでカットする?
            }
            return result;
        } catch (error) {
            // NOTE: クライント側エラーはTypeErrorになる

            // エラー情報
            const location = 'fetchClient.send';
            // const details = { config };
            const option = getCustomErrorProperties(error);
            const details = { config, option };

            // エラーログ出力
            const { all, message, name } = formatError({ error, location, details });
            // logger.error(logPrefix + all);

            // 発生したエラーをApplicationErrorにラップして再スロー
            throw applicationError({
                message,
                cause: error,
                location: logPrefix + location,
                extra: { ...details, cause: { name, message, ...option } },
            });
        }
    },
});
