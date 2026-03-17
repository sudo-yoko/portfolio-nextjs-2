import type { Logger } from '@/presentation/_system/logging/logging.types';

/**
 * NullLogger
 * ログ出力を抑止したい場合に使用する
 */
export const loggerImpl: Logger = {
    log: () => {},
    info: () => {},
    warn: () => {},
    error: () => {},
    debug: () => {},
    logAsync: async () => {},
    infoAsync: async () => {},
    warnAsync: async () => {},
    errorAsync: async () => {},
    debugAsync: async () => {},
};
