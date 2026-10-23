import 'server-only';

// NOTE: デフォルトエクスポートは好きな名前でimportできる
import type { ServerLogger } from '#logger/internal/isomophic/logger.types';
import { getOrCreateLogger } from '#logger/internal/server/logger.winston';
import { envNextPublicFwDebugLogger, envNodeEnvNext, NodeEnvNext } from '@my/env';

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
        if (envNodeEnvNext() === NodeEnvNext.Prod) {
            if (!envNextPublicFwDebugLogger()) {
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
