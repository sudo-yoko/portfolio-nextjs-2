import 'server-only';

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { Level } from '@my/logger';
import logger from '@my/logger/server';

const logPrefix = 'axios-adapter.transport.ts: ';

// // Axios インスタンスはアプリケーション内で一意
// // NOTE: 即時実行関数 (() => { ... })();
// const axiosInstance = (() => {
//     logger.info(logPrefix + 'Initializing axios instance...');
//     return axios.create();
// })();

let gAxiosInstance: AxiosInstance | undefined;

function getOrCreateAxiosInstance(): AxiosInstance {
    if (!gAxiosInstance) {
        logger.info(logPrefix + 'Initializing axios instance...');
        return axios.create();
    }
    return gAxiosInstance;
}

export async function executeAxios(config: AxiosRequestConfig) {
    logger.log(Level.Info, { logPrefix, format: 'AxiosRequestConfig: %o', params: [config] });
    // const rawBody = toStringSafe(res.data);
    const res = await getOrCreateAxiosInstance().request<string>(config);
    const rawBody = res.data;
    const status = res.status;
    return { status, rawBody };
}

// /**
//  * 型不明なオブジェクトを安全にstringにする
//  */
// function toStringSafe(value: unknown): string {
//     if (typeof value === 'string') {
//         return value;
//     }
//     if (value != null && typeof value === 'object') {
//         return JSON.stringify(value);
//     }
//     // TODO: カスタムエラー
//     throw Error();
// }
