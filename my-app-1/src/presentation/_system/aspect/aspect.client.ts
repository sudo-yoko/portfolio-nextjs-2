//
// クライアントサイド境界で共通の前後処理を行う
//
import 'client-only';

import {
    withErrorHandling,
    withErrorHandlingAsync,
} from '@/presentation/_system/aspect/internal/aspect.error-handling.client';
import {
    Ctx,
    withLogging,
    withLoggingAsync,
} from '@/presentation/_system/aspect/internal/aspect.logging';
import logger from '@/presentation/_system/logging/logger.c';

const logPrefix = 'aop.client-side.ts: ';

/**
 * 引数に渡されたサンクに共通処理を追加して実行する。
 */
export function withAdvice<T>(thunk: () => T, onAbort: () => void): T | void {
    const ctx: Ctx = { logger, logPrefix, process: 'sync client process' };
    return withLogging(ctx, () => withErrorHandling(thunk, onAbort));
}

/**
 * 引数に渡されたサンクに共通処理を追加して実行する。
 */
export async function withAdviceAsync<T>(thunk: () => Promise<T>, onAbort: () => void): Promise<T | void> {
    const ctx: Ctx = { logger, logPrefix, process: 'async client process' };
    return await withLoggingAsync(ctx, () => withErrorHandlingAsync(thunk, onAbort));
}
