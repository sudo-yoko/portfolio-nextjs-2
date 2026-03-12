import 'server-only';

import type { AxiosInstance } from 'axios';
import axios from 'axios';

import { env, envNumber, envProtocol } from '@/presentation/_system/env/env.helper.validated';

function create(): AxiosInstance {
    const protocol = envProtocol('PROXY_PROTOCOL');
    const host = env('PROXY_HOST');
    const port = envNumber('PROXY_PORT');

    return axios.create({
        proxy: { protocol, host, port },
        timeout: 10000,
    });
}

/**
 * プロキシ設定付き Axios インスタンス
 */
export const axiosInstance: AxiosInstance = create();
