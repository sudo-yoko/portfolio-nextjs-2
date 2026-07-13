//
// サーバーサイド境界で共通の前後処理を行う
//
import 'server-only';

import { withAuth, withAuthAsync } from '@/presentation/_system/aspect/internal/aspect.auth';
import {
    withErrorHandling,
    withErrorHandlingAsync,
} from '@/presentation/_system/aspect/internal/aspect.error-handling.server';
import {
    Ctx,
    withLogging,
    withLoggingAsync,
} from '@/presentation/_system/aspect/internal/aspect.logging';
import logger from '@/presentation/_system/logging/logger.s';

const logPrefix = 'aspect.server.ts: ';

/**
 * 引数に渡されたサンクに共通処理を追加して実行する。
 */
export function withAdvice<T>(thunk: () => T): T {
    const ctx: Ctx = { logger, logPrefix, process: 'sync server process' };
    return withLogging(ctx, () => withErrorHandling(() => withAuth(thunk)));
}

/**
 * 引数に渡されたサンクに共通処理を追加して実行する。
 */
export async function withAdviceAsync<T>(thunk: () => Promise<T>): Promise<T> {
    const ctx: Ctx = { logger, logPrefix, process: 'async server process' };
    return await withLoggingAsync(ctx, () => withErrorHandlingAsync(() => withAuthAsync(thunk)));
}
