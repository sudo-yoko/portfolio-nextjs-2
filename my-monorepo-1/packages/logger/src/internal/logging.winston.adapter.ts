import 'server-only';

import { envFwDebugLogger, envNodeEnvNext } from '@my/env';

// NOTE: デフォルトエクスポートは好きな名前でimportできる
import type { Logger } from '#logger/internal/logging.types';
import { getLogger } from '#logger/internal/logging.winston';

/**
 * winston によるロガー実装
 */
export const winstonAdapter: Logger = {
    log: (level, message, extras) => {
        getLogger().log(level, message, { ...extras });
    },
    info: (message, extras) => {
        getLogger().info(message, { ...extras });
    },
    warn: (message, extras) => {
        getLogger().warn(message, { ...extras });
    },
    error: (message, extras) => {
        getLogger().error(message, { ...extras });
    },
    debug: (message, extras) => {
        if (envNodeEnvNext() === 'production') {
            if (!envFwDebugLogger()) {
                return;
            }
        }
        getLogger().debug(message, { ...extras });
    },
    logAsync: async () => {}, // Not implemented
    infoAsync: async () => {}, // Not implemented
    warnAsync: async () => {}, // Not implemented
    errorAsync: async () => {}, // Not implemented
    debugAsync: async () => {}, // Not implemented
};
