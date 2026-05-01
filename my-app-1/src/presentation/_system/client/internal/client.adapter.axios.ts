//
// Axios インスタンスを Client インターフェースに適合させるアダプター
//

// プロキシも利用可なのでserver-only。クライアントサイド不可
import 'server-only';

import axios, { AxiosProxyConfig, AxiosRequestConfig, AxiosResponse } from 'axios';

import { defaultValidateStatusServer } from '@/presentation/_system/client/client.constants';
import { Client, Result } from '@/presentation/_system/client/client.types';
import { apiError } from '@/presentation/_system/error/error.factories';
import { getAxiosErrorProperties, stringify } from '@/presentation/_system/error/error.helper.stringify';
import logger from '@/presentation/_system/logging/logger.s';

const logPrefix = 'client.adapter.axios.ts: ';

// Axios インスタンスはアプリケーション内で一意
// TODO: モジュールスコープはproductionビルドで実行されてしまう？
const axiosInstance = (() => {
    logger.info(logPrefix + 'Initializing axios instance...');
    return axios.create();
})();

// NOTE: const func = (arg) => ({ ... }) （オブジェクトの暗黙的返却）
export const createAxiosClient = (proxy?: AxiosProxyConfig): Client => ({
    send: async (config) => {
        logger.info(logPrefix + `config=${JSON.stringify(config)}}, proxy=${JSON.stringify(proxy)}`);
        //
        // Axiosインスタンス作成
        //
        // TODO: これだとインスタンスが毎回作成される。共用のインスタンスを検討
        // const axiosInstance = axios.create({
        //     proxy,
        //     // timeout: config.timeout,
        // });
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
        let res: AxiosResponse;
        try {
            res = await axiosInstance.request(axiosConfig);
            const result: Result = {
                status: res.status,
                rawBody: toStringSafe(res.data),
            };
            logger.info(
                logPrefix + `Request -> ${JSON.stringify(config)}, Result -> ${JSON.stringify(result)}`,
            );
            return result;
        } catch (error) {
            // クライアント側エラーもサーバー側エラーもここに来る
            const details = getAxiosErrorProperties(error); // Axios固有のエラープロパティを取得
            logger.info(logPrefix + stringify({ error, details }).all);
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
