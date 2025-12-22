// エラーハンドリングAOP部品
import 'server-only';

import { stringify } from '@/presentation/(system)/error/error.helper.stringify';
import { isCustomError, isRetryableError } from '@/presentation/(system)/error/error.helpers';
import { CUSTOM_ERROR_TAG } from '@/presentation/(system)/error/error.types';
import logger from '@/presentation/(system)/logging/logger.s';
import { abort, retry } from '@/presentation/(system)/result/result.core.factories';
import { RESULT } from '@/presentation/(system)/result/result.core.types';

const logPrefix = 'aop.core.exception.bff.ts: ';

/**
 * 引数に渡されたサンクにエラーハンドリングを追加して実行する。
 */
export function withErrorHandling(thunk: () => RESULT): RESULT {
  const fname = 'withErrorHandling: ';
  try {
    return thunk();
  } catch (e) {
    return handleError(fname, e);
  }
}

/**
 * 引数に渡されたサンクにエラーハンドリングを追加して実行する。
 */
export async function withErrorHandlingAsync(thunk: () => Promise<RESULT>): Promise<RESULT> {
  const fname = 'withErrorHandlingAsync: ';
  try {
    return await thunk();
  } catch (e) {
    return handleError(fname, e);
  }
}

function handleError(fname: string, e: unknown): RESULT {
  const { message, all } = stringify(e);
  logger.error(logPrefix + fname + all);
  //
  // 再試行可能エラー
  //
  if (isRetryableError(e)) {
    const retryable = retry();
    // return resultResponse(retryable);
    return retryable;
  }
  //
  // その他続行不可能なエラー
  //
  const aborted = abort({ message });
  if (isCustomError(e)) {
    aborted.errType = e[CUSTOM_ERROR_TAG];
  }
  return aborted;
}
