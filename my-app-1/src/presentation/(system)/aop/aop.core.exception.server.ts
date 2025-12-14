// エラーハンドリングAOP部品
import 'server-only';

import { stringify } from '@/presentation/(system)/error/error.helper.stringify';
import logger from '@/presentation/(system)/logging/logger.s';

const logPrefix = 'aop.core.exception.server.ts: ';

/**
 * 引数に渡されたサンクにエラーハンドリングを追加して実行する。
 */
export function withErrorHandling<T>(thunk: () => T): T {
  const fname = 'withErrorHandling: ';
  try {
    // 引数に渡されたサンクを実行
    return thunk();
  } catch (error) {
    logger.error(logPrefix + fname + stringify(error).all);
    // 再スローすることで、Next.jsが未処理の例外としてキャッチしerror.tsxをレンダリングする。
    throw error;
  }
}

/**
 * 引数に渡されたサンクにエラーハンドリングを追加して実行する。
 */
export async function withErrorHandlingAsync<T>(thunk: () => Promise<T>): Promise<T> {
  const fname = 'withErrorHandlingAsync: ';
  try {
    return await thunk();
  } catch (error) {
    logger.error(logPrefix + fname + stringify(error).all);
    throw error;
  }
}
