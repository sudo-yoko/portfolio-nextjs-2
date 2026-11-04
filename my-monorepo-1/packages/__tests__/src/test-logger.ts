import { Logger } from '@/logger/src';

export const logPrefix = '#############';

export const logger: Logger = {
    log: (_level, message, _extras) => {
        console.log(logPrefix, message);
    },
    info: (message, _extras) => {
        console.log(logPrefix, message);
    },
    warn: (message, _extras) => {
        console.log(logPrefix, message);
    },
    error: (message, _extras) => {
        console.log(logPrefix, message);
    },
    debug: (message, _extras) => {
        console.log(logPrefix, message);
    },
    logAsync: async () => {}, // Not implemented
    infoAsync: async () => {}, // Not implemented
    warnAsync: async () => {}, // Not implemented
    errorAsync: async () => {}, // Not implemented
    debugAsync: async () => {}, // Not implemented
};
