//
// クライアントサイドインターセプター
// クラインとサイド処理の前後に共通処理を挟む
//
import 'client-only';

import {
  withErrorHandling,
  withErrorHandlingAsync,
} from '@/presentation/(system)/middleware/interceptor.core.exception.client';
import { withLogging, withLoggingAsync } from '@/presentation/(system)/middleware/interceptor.core.logging.c';

const logPrefix = 'interceptor.feature.client.ts';

export function execute<T>(
  thunk: () => T,
  setHasError: React.Dispatch<React.SetStateAction<boolean>>,
): T | void {
  const text = { logPrefix, process: 'sync client process' };
  return withLogging(text, () => withErrorHandling(thunk, setHasError));
}

export async function executeAsync<T>(
  thunk: () => Promise<T>,
  setHasError: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<T | void> {
  const text = { logPrefix, process: 'async client process' };
  return withLoggingAsync(text, () => withErrorHandlingAsync(thunk, setHasError));
}
