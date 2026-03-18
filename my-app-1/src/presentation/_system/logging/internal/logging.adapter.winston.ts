import 'server-only';

import debug from '@/presentation/_system/logging/internal/logging.core.debug';
import logger from '@/presentation/_system/logging/internal/logging.core.winston';
import type { Logger } from '@/presentation/_system/logging/logging.types';

/**
 * winston によるロガー実装
 */
export const winstonLogger: Logger = {
    log: (level, message, extras) => {
        logger.log(level, message, { ...extras });
    },
    info: (message, extras) => {
        logger.info(message, { ...extras });
    },
    warn: (message, extras) => {
        logger.warn(message, { ...extras });
    },
    error: (message, extras) => {
        logger.error(message, { ...extras });
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
