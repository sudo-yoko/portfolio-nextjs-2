//
// クライアントサイド／サーバーサイド 両用ロガー
//
import type { Logger } from '@/presentation/_system/logging/logging.types';

export async function loadIsomorphicLogger(type: 'console' | 'null'): Promise<Logger> {
    switch (type) {
        // コンソールロガー
        case 'console':
            return (await import('@/presentation/_system/logging/internal/logging.adapter.console')).consoleLogger;

        // 何もしないNullロガー
        case 'null':
        default:
            return (await import('@/presentation/_system/logging/internal/logging.adapter.null')).nullLogger;
    }
}
