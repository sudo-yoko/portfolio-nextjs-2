import 'server-only';

import util from 'node:util';

// NOTE: デフォルトエクスポートは好きな名前でimportできる
import type { ServerLogger } from '#logger/internal/isomorphic/logger.types';
import { getOrCreateLogger } from '#logger/internal/server/adapters/logger.winston';
import { envNextPublicFwDebugLogger, envNodeEnvNext, NodeEnvNext } from '@my/env';

/**
 * winston によるロガー実装
 */
export const winstonAdapter: ServerLogger = {
    initialize: () => {
        getOrCreateLogger();
    },
    log: (level, { logPrefix = '', format, params = [], extras }) => {
        getOrCreateLogger().log(level, logPrefix + util.format(format, ...params), { ...extras });
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
