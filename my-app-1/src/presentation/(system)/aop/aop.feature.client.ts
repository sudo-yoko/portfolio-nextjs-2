//
// クライアントサイド・インターセプター
// クラインとサイド処理の前後に共通処理を挟む
//
import 'client-only';

import {
  withErrorHandling,
  withErrorHandlingAsync,
} from '@/presentation/(system)/aop/aop.core.exception.client';

export function execute<T>(
  thunk: () => T,
  setHasError: React.Dispatch<React.SetStateAction<boolean>>,
): T | void {
  return withErrorHandling(thunk, setHasError);
}

export async function executeAsync<T>(
  thunk: () => Promise<T>,
  setHasError: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<T | void> {
  return withErrorHandlingAsync(thunk, setHasError);
}
