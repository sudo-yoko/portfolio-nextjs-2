import 'server-only';

import { createAxiosClient } from '@/presentation/_system/client/client.adapter.axios';
import { axiosInstance } from '@/presentation/_system/client/client.core.axios';
import { Client } from '@/presentation/_system/client/client.types';
import logger from '@/presentation/_system/logging/logger.s';

export const getClient = async (type: 'fetch' | 'axios' | 'axios-proxy'): Promise<Client> => {
    switch (type) {
        case 'axios-proxy': {
            // NOTE: case に {} をつけると case 専用のブロックスコープを定義できる
            const { axiosInstance: proxyInstance } = await import(
                '@/presentation/_system/client/client.core.axios.proxy'
            );
            return createAxiosClient(proxyInstance, logger);
        }
        case 'fetch': {
            const { createFetchClient } = await import('@/presentation/_system/client/client.adapter.fetch');
            return createFetchClient(logger);
        }
        case 'axios':
        default:
            return createAxiosClient(axiosInstance, logger);
    }
};
