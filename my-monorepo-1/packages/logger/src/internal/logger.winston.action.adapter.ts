//
// Server Actions を使ったロガー
// 主にクライアントサイドからログをサーバーに送信する場合の利用を想定
//
import 'client-only';

import type { Logger } from '#logger/internal/logger.types';
import { logDebug, logError, logInfo } from '#logger/internal/logger.winston.action';

/**
 * ServerActions によるロガー実装
 */
export const actionAdapter: Logger = {
    log: () => {
        // Not implemented
    },
    info: async (message, extras) => {
        await logInfo(message, extras);
    },
    warn: () => {
        // Not implemented
    },
    error: async (message, extras) => {
        await logError(message, extras);
    },
    debug: async (message, extras) => {
        await logDebug(message, extras);
    },
    logAsync: async () => {
        // Not implemented
    },
    infoAsync: async (message, extras) => {
        void logInfo(message, extras);
    },
    warnAsync: async () => {
        // Not implemented
    },
    errorAsync: async (message, extras) => {
        void logError(message, extras);
    },
    debugAsync: async (message, extras) => {
        void logDebug(message, extras);
    },
};
