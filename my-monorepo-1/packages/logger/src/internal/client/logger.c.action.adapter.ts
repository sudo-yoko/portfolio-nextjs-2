//
// Server Actions を使ったロガー
// 主にクライアントサイドからログをサーバーに送信する場合の利用を想定
//
import 'client-only';

import { logDebug, logError, logInfo } from '#logger/internal/client/logger.c.action';
import type { Logger } from '#logger/internal/isomorphic/logger.types';

/**
 * ServerActions によるロガー実装
 */
export const loggerActionAdapter: Logger = {
    log: () => {
        // Not implemented
    },
    info: (message, extras) => {
        void logInfo(message, extras).catch(() => {});
    },
    warn: () => {
        // Not implemented
    },
    error: (message, extras) => {
        void logError(message, extras).catch(() => {});
    },
    debug: (message, extras) => {
        void logDebug(message, extras).catch(() => {});
    },
    // logAsync: async () => {
    //     // Not implemented
    // },
    // infoAsync: async (message, extras) => {
    //     void logInfo(message, extras);
    // },
    // warnAsync: async () => {
    //     // Not implemented
    // },
    // errorAsync: async (message, extras) => {
    //     void logError(message, extras);
    // },
    // debugAsync: async (message, extras) => {
    //     void logDebug(message, extras);
    // },
};
