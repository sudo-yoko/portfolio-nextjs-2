//
// クライアントサイド境界で共通の前後処理を行う
//
import 'client-only';

import { withErrorHandling, withErrorHandlingAsync } from '#aspect/internal/aspect.error-handling.client';
import { Ctx, withLogging, withLoggingAsync } from '#aspect/internal/aspect.logging';
import logger from '@my/logger/browser';

const logPrefix = 'aspect.client.ts: ';

/**
 * 引数に渡されたサンクに共通処理を追加して実行する。
 */
export function withAdvice<T>(subject: () => void, onAbort: () => void): T | void {
    const ctx: Ctx = { logger, logPrefix, process: 'sync client process' };
    return withLogging(ctx, () => withErrorHandling(subject, onAbort));
}

/**
 * 引数に渡されたサンクに共通処理を追加して実行する。
 */
export async function withAdviceAsync<T>(
    subject: () => Promise<void>,
    onAbort: () => void,
): Promise<T | void> {
    const ctx: Ctx = { logger, logPrefix, process: 'async client process' };
    return await withLoggingAsync(ctx, () => withErrorHandlingAsync(subject, onAbort));
}
