import 'server-only';

import { envFwDebugLogger, envNodeEnvNext } from '@my/env';

// NOTE: デフォルトエクスポートは好きな名前でimportできる
import type { ServerLogger } from '#logger/internal/logger.types';
import { getOrCreateLogger } from '#logger/internal/logger.winston';

/**
 * winston によるロガー実装
 */
export const winstonAdapter: ServerLogger = {
    initialize: () => {
        getOrCreateLogger();
    },
    log: (level, message, extras) => {
        getOrCreateLogger().log(level, message, { ...extras });
    },
    info: (message, extras) => {
        getOrCreateLogger().info(message, { ...extras });
    },
    warn: (message, extras) => {
        getOrCreateLogger().warn(message, { ...extras });
    },
    error: (message, extras) => {
        getOrCreateLogger().error(message, { ...extras });
    },
    debug: (message, extras) => {
        if (envNodeEnvNext() === 'production') {
            if (!envFwDebugLogger()) {
                return;
            }
        }
        getOrCreateLogger().debug(message, { ...extras });
    },
    logAsync: async () => {}, // Not implemented
    infoAsync: async () => {}, // Not implemented
    warnAsync: async () => {}, // Not implemented
    errorAsync: async () => {}, // Not implemented
    debugAsync: async () => {}, // Not implemented
};
