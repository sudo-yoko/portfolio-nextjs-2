//
// Server Actions を使ったロガー
// 主にクライアントサイドからログをサーバーに送信する場合の利用を想定
//
import 'client-only';

import { logDebug, logError, logInfo } from '@/presentation/_system/logging/internal/logging.winston.action';
import type { Logger } from '@/presentation/_system/logging/logging.types';

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
