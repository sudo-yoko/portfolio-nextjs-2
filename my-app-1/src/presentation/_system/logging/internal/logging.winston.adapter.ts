import 'server-only';

// NOTE: デフォルトエクスポートは好きな名前でimportできる
import winston from '@/presentation/_system/logging/internal/logging.winston.core';
import type { Logger } from '@/presentation/_system/logging/logging.types'
import { envByStaticKey as env } from '@/presentation/_system/env/env';

/**
 * winston によるロガー実装
 */
export const winstonAdapter: Logger = {
    log: (level, message, extras) => {
        winston.log(level, message, { ...extras });
    },
    info: (message, extras) => {
        winston.info(message, { ...extras });
    },
    warn: (message, extras) => {
        winston.warn(message, { ...extras });
    },
    error: (message, extras) => {
        winston.error(message, { ...extras });
    },
    debug: (message, extras) => {
        if (env.NODE_ENV === 'production') {
            if (!env.NEXT_PUBLIC_DEBUG_LOGGER) {
                return;
            }
        }
        winston.debug(message, { ...extras });
    },
    logAsync: async () => {}, // Not implemented
    infoAsync: async () => {}, // Not implemented
    warnAsync: async () => {}, // Not implemented
    errorAsync: async () => {}, // Not implemented
    debugAsync: async () => {}, // Not implemented
};
