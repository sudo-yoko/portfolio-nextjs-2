import 'server-only';

import { Client } from '@/presentation/_system/client/client.types';
import { axiosClient } from '@/presentation/_system/client/internal/client.adapter.axios';
import { nodeClient } from '@/presentation/_system/client/internal/client.adapter.node';
import { stubClient } from '@/presentation/_system/client/internal/client.adapter.stub';
import { undiciClient } from '@/presentation/_system/client/internal/client.adapter.undici';
import { envProxy, proxyUrl } from '@/presentation/_system/env/env.s.helper';

/**
 * サーバーサイド専用 Client を読み込む
 */
export const createClient = async (
    type: 'axios' | 'axios-proxy' | 'undici' | 'undici-proxy' | 'node' | 'dummy',
): Promise<Client> => {
    // TODO: キャッシュを検討
    switch (type) {
        case 'axios-proxy': {
            // NOTE: case に {} をつけると case 専用のブロックスコープを作成できる
            return axiosClient(envProxy);
        }
        case 'undici': {
            return undiciClient();
        }
        case 'undici-proxy': {
            return undiciClient(proxyUrl);
        }
        case 'node': {
            return nodeClient();
        }
        case 'dummy': {
            return stubClient();
        }
        case 'axios':
        default: {
            return axiosClient();
        }
    }
};
