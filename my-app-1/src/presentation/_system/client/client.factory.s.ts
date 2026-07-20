import 'server-only';

import { Client } from '@/presentation/_system/client/client.types';
import { axiosClient } from '@/presentation/_system/client/internal/axios-adapter';
import { fetchClient } from '@/presentation/_system/client/internal/fetch-adapter.s';
import { nodeClient } from '@/presentation/_system/client/internal/node-adapter';
import { stubClient } from '@/presentation/_system/client/internal/stub-adapter';
import { undiciClient } from '@/presentation/_system/client/internal/undici-adapter';
import { envProxy, proxyUrl } from '@/presentation/_system/env/env.s.helper';

/**
 * サーバーサイド専用 Client を読み込む
 */
export const loadClient = async (
    type: 'axios' | 'axios-proxy' | 'undici' | 'undici-proxy' | 'node' | 'dummy' | 'fetch',
): Promise<Client> => {
    // TODO: 動的インポートとキャッシュを検討
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
        case 'fetch': {
            return fetchClient();
        }
        case 'axios':
        default: {
            return axiosClient();
        }
    }
};
