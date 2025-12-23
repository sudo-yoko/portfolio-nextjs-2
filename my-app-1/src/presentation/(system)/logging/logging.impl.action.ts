//
// Server Actions を使ったロガー
// 主にクライアントサイドからログをサーバーに送信する場合の利用を想定
//
import 'client-only';

import { envByStaticKey as env } from '@/presentation/(system)/env/env';
import debug from '@/presentation/(system)/logging/logging.core.debug';
import { logDebug, logError, logInfo } from '@/presentation/(system)/logging/logging.feature.action';
import type { Logger } from '@/presentation/(system)/logging/logging.types';

/**
 * ServerActions によるロガー実装
 */
export const loggerImpl: Logger = {
    info: async (message, _extras) => {
        await logInfo(message);
    },
    error: async (message, _extras) => {
        await logError(message);
    },
    debug: (message, _extras) => {
        // デバッグログをコンソールに出力
        debug(message);
        // デバッグログをファイルにも出力したい場合
        if (env.NEXT_PUBLIC_DEBUG_LOGGER) {
            void logDebug(message);
        }
    },
    infoAsync: async (message, _extras) => {
        void logInfo(message);
    },
    errorAsync: async (message, _extras) => {
        void logError(message);
    },
    debugAsync: async (message, _extras) => {
        debug(message);
    },
    log: () => {}, // Not implemented
    warn: () => {}, // Not implemented
    logAsync: async () => {}, // Not implemented
    warnAsync: async () => {}, // Not implemented
};
