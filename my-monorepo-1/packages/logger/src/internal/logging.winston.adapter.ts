import 'server-only';

import { envFwDebugLogger, envNodeEnvNext } from '@my/env';

// NOTE: デフォルトエクスポートは好きな名前でimportできる
import type { Logger } from '#logger/internal/logging.types';
import winston from '#logger/internal/logging.winston';

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
        if (envNodeEnvNext() === 'production') {
            if (!envFwDebugLogger()) {
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
