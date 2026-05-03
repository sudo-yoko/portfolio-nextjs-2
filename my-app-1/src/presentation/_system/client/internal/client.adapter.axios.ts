//
// Axios インスタンスを Client インターフェースに適合させるアダプター
//

// プロキシも利用可なのでserver-only。クライアントサイド不可
import 'server-only';

import axios, { AxiosProxyConfig, AxiosRequestConfig } from 'axios';

import { defaultValidateStatusServer } from '@/presentation/_system/client/client.constants';
import { Client, Result } from '@/presentation/_system/client/client.types';
import { apiError } from '@/presentation/_system/error/error.factories';
import { getAxiosErrorProperties, stringify } from '@/presentation/_system/error/error.helper.stringify';
import logger from '@/presentation/_system/logging/logger.s';

const logPrefix = 'client.adapter.axios.ts: ';

// Axios インスタンスはアプリケーション内で一意
// NOTE: 即時実行関数 (() => { ... })();
const axiosInstance = (() => {
    logger.info(logPrefix + 'Initializing axios instance...');
    return axios.create();
})();

// NOTE: オブジェクトの暗黙的返却 const func = (arg) => ({ ... });
export const createAxiosClient = (proxy?: AxiosProxyConfig): Client => ({
    send: async (config) => {
        logger.info(
            logPrefix + `Request -> config=${JSON.stringify(config)}}, proxy=${JSON.stringify(proxy)}`,
        );
        //
        // リクエスト設定
        //
        const axiosConfig: AxiosRequestConfig = {};
        axiosConfig.url = config.url;
        axiosConfig.method = config.method;
        if (config.query) {
            const searchParams = new URLSearchParams();
            config.query.forEach(({ key, value }) => searchParams.append(key, value));
            axiosConfig.params = searchParams;
        }
        axiosConfig.validateStatus = config.validateStatus ?? defaultValidateStatusServer;
        axiosConfig.data = config.body;
        axiosConfig.timeout = config.timeout;
        axiosConfig.proxy = proxy;
        //
        // リクエスト実行
        //
        try {
            const res = await axiosInstance.request(axiosConfig);
            const result: Result = {
                status: res.status,
                rawBody: toStringSafe(res.data), // bodyがjsonとは限らないのでtextで取得する。エラーの場合はhtmlが返ってくることもある
            };
            logger.info(logPrefix + `Response -> ${JSON.stringify(result)}`);
            return result;
        } catch (error) {
            // クライアント側エラーもサーバー側エラーもここに来る
            const details = getAxiosErrorProperties(error); // Axios固有のエラープロパティを取得
            logger.error(logPrefix + stringify({ error, details }).all);
            throw apiError({ cause: error });
        }
    },
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
