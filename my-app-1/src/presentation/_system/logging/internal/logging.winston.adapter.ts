import 'server-only';

// NOTE: デフォルトエクスポートは好きな名前でimportできる
import winston from '@/presentation/_system/logging/internal/logging.winston.core';
import type { Logger } from '@/presentation/_system/logging/logging.types';
import { envByStaticKey as env } from '@/presentation/_system/env/env';

/**
 * winston によるロガー実装
 */
// TODO: プレフィックス付きロガー
// export const winstonAdapter: Logger = {
export const createWinstonAdapter: ({ logPrefix }: { logPrefix?: string }) => Logger = ({ logPrefix }) => {
    return {
        log: (level, message, extras) => {
            winston.log(level, logPrefix + message, { ...extras });
        },
        info: (message, extras) => {
            winston.info(logPrefix + message, { ...extras });
        },
        warn: (message, extras) => {
            winston.warn(logPrefix + message, { ...extras });
        },
        error: (message, extras) => {
            winston.error(logPrefix + message, { ...extras });
        },
        debug: (message, extras) => {
            if (env.NODE_ENV === 'production') {
                if (!env.NEXT_PUBLIC_DEBUG_LOGGER) {
                    return;
                }
            }
            winston.debug(logPrefix + message, { ...extras });
        },
        logAsync: async () => {}, // Not implemented
        infoAsync: async () => {}, // Not implemented
        warnAsync: async () => {}, // Not implemented
        errorAsync: async () => {}, // Not implemented
        debugAsync: async () => {}, // Not implemented
    };
};

/**
 * グローバルロガー
 */
export const winstonAdapter = createWinstonAdapter({});
