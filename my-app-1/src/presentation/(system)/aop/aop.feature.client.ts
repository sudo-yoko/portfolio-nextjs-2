//
// クライアントサイド共通処理
//
import 'client-only';

import {
  withErrorHandling,
  withErrorHandlingAsync,
} from '@/presentation/(system)/aop/aop.core.exception.client';
import { Ctx, withLogging, withLoggingAsync } from '@/presentation/(system)/aop/aop.core.logging';
import logger from '@/presentation/(system)/logging/logger.c';

const logPrefix = 'aop.feature.client.ts: ';

/**
 * 引数に渡されたサンクに共通処理を追加して実行する。
 */
export function execute<T>(
  thunk: () => T,
  setHasError: React.Dispatch<React.SetStateAction<boolean>>,
): T | void {
  const ctx: Ctx = { logger, logPrefix, process: 'sync client process' };
  return withLogging(ctx, () => withErrorHandling(thunk, setHasError));
}

/**
 * 引数に渡されたサンクに共通処理を追加して実行する。
 */
export async function executeAsync<T>(
  thunk: () => Promise<T>,
  setHasError: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<T | void> {
  const ctx: Ctx = { logger, logPrefix, process: 'async client process' };
  return await withLoggingAsync(ctx, () => withErrorHandlingAsync(thunk, setHasError));
}
