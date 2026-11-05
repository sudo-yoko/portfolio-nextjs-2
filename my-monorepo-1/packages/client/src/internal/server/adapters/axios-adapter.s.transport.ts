import 'server-only';

import axios from 'axios';

import logger from '@my/logger/server';
import { Level } from '@my/logger';

const logPrefix = 'axios-adapter.transport.ts: ';

// Axios インスタンスはアプリケーション内で一意
// NOTE: 即時実行関数 (() => { ... })();
const axiosInstance = (() => {
    logger.info(logPrefix + 'Initializing axios instance...');
    return axios.create();
})();

export async function executeAxios(...args: Parameters<typeof axiosInstance.request>) {
    logger.log(Level.Info, { logPrefix, format: 'AxiosRequestConfig: %o', params: [...args] });
    const res = await axiosInstance.request<string>(...args);
    // const rawBody = toStringSafe(res.data);
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
