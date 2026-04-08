import 'server-only';

import type { AxiosInstance } from 'axios';
import axios from 'axios';

import { Client, ValidateStatus } from '@/presentation/_system/client/client.types';
import * as adapter from '@/presentation/_system/client/internal/client.adapter.axios';
import { envProxy } from '@/presentation/_system/env/env.s.helper';
import { Logger } from '@/presentation/_system/logging/logging.types';

/**
 * プロキシ設定付き Axios インスタンス
 */
// function create(): AxiosInstance {
// NOTE: 即時実行関数 (() => { ... })();
const axiosInstance: AxiosInstance = (() => {
    const { protocol, host, port } = envProxy;
    return axios.create({
        proxy: { protocol, host, port },
        timeout: 10000,
    });
})();

// export const axiosInstance: AxiosInstance = create();

/**
 * プロキシ設定付き Axios の Client オブジェクトを作成する
 */
export const createAxiosProxyClient = (logger: Logger, defaultValidateStatus: ValidateStatus): Client => {
    return adapter.createAxiosClient(axiosInstance, logger, defaultValidateStatus);
};
