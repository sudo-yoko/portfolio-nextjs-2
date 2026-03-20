import debug from '@/presentation/_system/logging/internal/logging.core.debug';
import type { Logger } from '@/presentation/_system/logging/logging.types';

/**
 * コンソールによるロガー実装
 */
export const consoleLogger: Logger = {
    log: (_level, message, _extras) => {
        console.log(message);
    },
    info: (message, extras) => {
        console.info(message, extras);
    },
    warn: (message, _extras) => {
        console.warn(message);
    },
    error: (message, _extras) => {
        console.error(message);
    },
    debug: (message, _extras) => {
        debug(message);
    },
    logAsync: async () => {}, // Not implemented
    infoAsync: async () => {}, // Not implemented
    warnAsync: async () => {}, // Not implemented
    errorAsync: async () => {}, // Not implemented
    debugAsync: async () => {}, // Not implemented
};
