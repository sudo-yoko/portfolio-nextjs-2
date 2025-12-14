//
// クライアントサイド共通処理
//
import 'client-only';

import {
  withErrorHandling,
  withErrorHandlingAsync,
} from '@/presentation/(system)/aop/aop.core.exception.client';

/**
 * 引数に渡されたサンクに共通処理を追加して実行する。
 */
export function execute<T>(
  thunk: () => T,
  setHasError: React.Dispatch<React.SetStateAction<boolean>>,
): T | void {
  return withErrorHandling(thunk, setHasError);
}

/**
 * 引数に渡されたサンクに共通処理を追加して実行する。
 */
export async function executeAsync<T>(
  thunk: () => Promise<T>,
  setHasError: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<T | void> {
  return await withErrorHandlingAsync(thunk, setHasError);
}
