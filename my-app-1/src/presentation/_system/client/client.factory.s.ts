import 'server-only';

// import { axiosInstance } from '@/presentation/_system/client/client.core.axios';
import { Client } from '@/presentation/_system/client/client.types';
import { createUndiciClient } from '@/presentation/_system/client/internal/client.adapter.undici';
// import { createAxiosClient } from '@/presentation/_system/client/internal/client.core.axios';
import { defaultValidateStatusServer } from '@/presentation/_system/client/client.constants';
import { createAxiosClient } from '@/presentation/_system/client/internal/client.adapter.axios';
import { createNodeClient } from '@/presentation/_system/client/internal/client.adapter.node';
import { createStubClient } from '@/presentation/_system/client/internal/client.adapter.stub';
import { envProxy, proxyUrl } from '@/presentation/_system/env/env.s.helper';
import logger from '@/presentation/_system/logging/logger.s';

/**
 * サーバーサイド専用 Client を読み込む
 */
export const createClient = async (
    type: 'fetch' | 'axios' | 'axios-proxy' | 'undici' | 'undici-proxy' | 'node' | 'dummy',
): Promise<Client> => {
    // TODO: キャッシュを検討
    switch (type) {
        case 'axios-proxy': {
            // NOTE: case に {} をつけると case 専用のブロックスコープを作成できる
            // const { createAxiosClient } = await import(
            //     '@/presentation/_system/client/internal/client.core.axios.proxy '
            // );
            // TODO: proxy時のクエリパラメータがおかしくなる
            return createAxiosClient(envProxy);
        }
        case 'fetch': {
            const { createFetchClient } = await import(
                '@/presentation/_system/client/internal/client.adapter.fetch'
            );
            return createFetchClient(logger, defaultValidateStatusServer);
        }
        case 'undici': {
            return createUndiciClient();
        }
        case 'undici-proxy': {
            return createUndiciClient(proxyUrl);
        }
        case 'node': {
            return createNodeClient();
        }
        case 'dummy': {
            return createStubClient();
        }
        case 'axios':
        default: {
            return createAxiosClient();
        }
    }
};
