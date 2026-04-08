import 'server-only';

// import { axiosInstance } from '@/presentation/_system/client/client.core.axios';
import { Client, ValidateStatus } from '@/presentation/_system/client/client.types';
import { createUndiciClient } from '@/presentation/_system/client/internal/client.adapter.undici';
import { createAxiosClient } from '@/presentation/_system/client/internal/client.core.axios';
import { proxyUrl } from '@/presentation/_system/env/env.s.helper';
import logger from '@/presentation/_system/logging/logger.s';

/**
 * レスポンスステータスの検証
 */
// デフォルトは、500 以上のステータスコードの場合はエラーをスローする
const defaultValidateStatus: ValidateStatus = (status: number) => status > 500;

/**
 * サーバーサイド専用 Client を読み込む
 */
export const createClient = async (
    type: 'fetch' | 'axios' | 'axios-proxy' | 'undici' | 'undici-proxy',
): Promise<Client> => {
    // TODO: キャッシュを検討
    switch (type) {
        case 'axios-proxy': {
            // NOTE: case に {} をつけると case 専用のブロックスコープを作成できる
            const { createAxiosProxyClient } = await import(
                '@/presentation/_system/client/internal/client.core.axios.proxy'
            );
            return createAxiosProxyClient(logger, defaultValidateStatus);
        }
        case 'fetch': {
            const { createFetchClient } = await import(
                '@/presentation/_system/client/internal/client.adapter.fetch'
            );
            return createFetchClient(logger, defaultValidateStatus);
        }
        case 'undici': {
            return createUndiciClient(logger, defaultValidateStatus);
        }
        case 'undici-proxy': {
            return createUndiciClient(logger, defaultValidateStatus, proxyUrl);
        }
        case 'axios':
        default: {
            return createAxiosClient(logger, defaultValidateStatus);
        }
    }
};
