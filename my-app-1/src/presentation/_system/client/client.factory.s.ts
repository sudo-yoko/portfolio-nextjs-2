import 'server-only';

// import { axiosInstance } from '@/presentation/_system/client/client.core.axios';
import { createAxiosClient } from '@/presentation/_system/client/client.core.axios';
import { Client, ValidateStatus } from '@/presentation/_system/client/client.types';
import logger from '@/presentation/_system/logging/logger.s';

/**
 * レスポンスステータスの検証
 */
// デフォルトは、500 以上のステータスコードの場合はエラーをスローする
const defaultValidateStatus: ValidateStatus = (status: number) => status > 500;

/**
 * サーバーサイド専用 Client を読み込む
 */
export const createClient = async (type: 'fetch' | 'axios' | 'axios-proxy'): Promise<Client> => {
    // TODO: キャッシュを検討
    switch (type) {
        case 'axios-proxy': {
            // NOTE: case に {} をつけると case 専用のブロックスコープを作成できる
            const { createAxiosProxyClient } = await import(
                '@/presentation/_system/client/client.core.axios.proxy'
            );
            return createAxiosProxyClient(logger, defaultValidateStatus);
        }
        case 'fetch': {
            const { createFetchClient } = await import('@/presentation/_system/client/client.adapter.fetch');
            return createFetchClient(logger, defaultValidateStatus);
        }
        case 'axios':
        default: {
            return createAxiosClient(logger, defaultValidateStatus);
        }
    }
};
