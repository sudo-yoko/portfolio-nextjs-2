//
// axios アダプター
//
import 'server-only'; // プロキシも利用可能とするのでserver-only。クライアントサイド不可

import axios, { AxiosProxyConfig, AxiosRequestConfig } from 'axios';

import { applicationError, formatError } from '@my/error';
import { Level } from '@my/logger';
import logger from '@my/logger/server';

import { defaultValidateStatus } from '#client/internal/isomorphic/client.constants';
import { toURLSearchParams } from '#client/internal/isomorphic/client.params';
import { Client } from '#client/internal/isomorphic/client.types';
import { validateBodyConfig } from '#client/internal/isomorphic/client.validator';
import { executeAxios } from '#client/internal/server/adapters/axios-adapter.s.transport';

const logPrefix = 'axios-adapter.s.ts: ';

// // Axios インスタンスはアプリケーション内で一意
// // NOTE: 即時実行関数 (() => { ... })();
// const axiosInstance = (() => {
//     logger.info(logPrefix + 'Initializing axios instance...');
//     return axios.create();
// })();

// NOTE: オブジェクトの暗黙的返却 const func = (arg) => ({ ... });
export const createAxiosClient = (proxy?: AxiosProxyConfig): Client => ({
    send: async (config) => {
        // const location = 'client.adapter.axios.ts#send';
        // logger.info(logPrefix + `Request -> config=${stringify(config)}, proxy=${JSON.stringify(proxy)}`);
        logger.log(Level.Info, {
            logPrefix,
            format: 'Request -> config=%o, proxy=%o',
            params: [config, proxy],
        });
        try {
            validateBodyConfig(config);
            //
            // リクエスト設定
            //
            const axiosConfig: AxiosRequestConfig = {};
            axiosConfig.url = config.url;
            axiosConfig.method = config.method;
            axiosConfig.headers = config.headers;
            // TODO: リクエストヘッダー
            if (config.query) {
                // const searchParams = new URLSearchParams();
                // config.query.forEach(({ key, value }) => searchParams.append(key, value));
                // axiosConfig.params = searchParams;
                axiosConfig.params = toURLSearchParams(config.query);
            }
            // axiosのデフォルト動作としてステータスコード200以外の場合はエラーをスローするため、アプリケーション既定の動作を上書きする
            axiosConfig.validateStatus = config.validateStatus ?? defaultValidateStatus;
            if (config.bodyJson !== undefined) {
                axiosConfig.data = config.bodyJson;
            } else if (config.bodyUrlEncoded !== undefined) {
                axiosConfig.data = config.bodyUrlEncoded;
            }
            axiosConfig.timeout = config.timeout;
            axiosConfig.proxy = proxy ?? false;
            axiosConfig.responseType = 'text';
            //
            // リクエスト実行
            //
            // const res = await axiosInstance.request(axiosConfig);
            // const result: RawResponse = {
            //     status: res.status,
            //     rawBody: toStringSafe(res.data), // bodyがjsonとは限らないのでtextで取得する。エラーの場合はhtmlが返ってくることもある
            // };
            const result = await executeAxios(axiosConfig);
            logger.info(logPrefix + `Response -> ${JSON.stringify(result)}`);
            return result;
        } catch (error) {
            // クライアント側エラーもサーバー側エラーもここに来る

            // エラー情報
            const location = 'axiosClient.send';
            // const details = { config, proxy };
            const option = getAxiosErrorProperties(error); // Axios固有のエラープロパティを取得
            const details = { req: config, proxy, axiosError: option };

            // エラーログ出力
            const { all, message, name } = formatError({ error, location, details });
            logger.error(logPrefix + all);

            // 発生したエラーをApplicationErrorにラップして再スロー
            // TODO: formatErrorに渡すのと同じ情報をわたせるようにする
            // TODO: ApplicationErrorにリクエスト情報も渡せるようにする
            // TODO: バックエンドと外部リクエストで共用のため、エラーメッセージは再検討
            throw applicationError({
                message: 'バックエンドAPIのリクエストで失敗しました。',
                cause: error,
                location: logPrefix + location,
                extra: details,
            });
            // throw error;
        }
    },
});

/**
 * Errorオブジェクトの中からaxios固有のプロパティを取得する
 */
export function getAxiosErrorProperties(err: unknown): object {
    const option: Record<string, unknown> = {};
    if (axios.isAxiosError(err)) {
        option['name'] = err.constructor.name;
        option['message'] = err.message;
        option['code'] = err.code;
        option['status'] = err.response?.status ?? 'undefined';

        // return { str: JSON.stringify(option, null, 2), obj: option };
    }
    // return { str: JSON.stringify(option, null, 2), obj: option };
    return option;
}
