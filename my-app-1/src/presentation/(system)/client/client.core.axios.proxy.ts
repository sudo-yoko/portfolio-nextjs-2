//
// プロキシ設定付きRESTクライアント（Axiosインスタンス）
//
import 'server-only';

import { env, envNumber, envProtocol } from '@/presentation/(system)/env/env.helper.validated';
import type { AxiosInstance } from 'axios';
import axios from 'axios';

function create(): AxiosInstance {
  const protocol = envProtocol('PROXY_PROTOCOL');
  const host = env('PROXY_HOST');
  const port = envNumber('PROXY_PORT');

  return axios.create({
    proxy: { protocol, host, port },
    timeout: 10000,
  });
}

export const client: AxiosInstance = create();
