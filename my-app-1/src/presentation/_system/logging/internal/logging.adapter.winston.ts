import 'server-only';

import debug from '@/presentation/_system/logging/internal/logging.core.debug';
// NOTE: デフォルトエクスポートは好きな名前でimportできる
import winston from '@/presentation/_system/logging/internal/logging.core.winston';
import type { Logger } from '@/presentation/_system/logging/logging.types';

/**
 * winston によるロガー実装
 */
export const winstonLogger: Logger = {
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
    debug: (message, _extras) => {
        debug(message);
        //logger.debug(message, { ...extras });
    },
    logAsync: async () => {}, // Not implemented
    infoAsync: async () => {}, // Not implemented
    warnAsync: async () => {}, // Not implemented
    errorAsync: async () => {}, // Not implemented
    debugAsync: async () => {}, // Not implemented
};
