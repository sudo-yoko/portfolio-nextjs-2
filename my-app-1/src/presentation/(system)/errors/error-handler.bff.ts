import 'server-only';

import { stringify } from '@/presentation/(system)/errors/stringify-error';
import logger from '@/presentation/(system)/logging/logger.s';
import type { BffResult } from '@/presentation/(system)/bff/bff-result';
import { abort } from '@/presentation/(system)/bff/bff-result';

const logPrefix = 'bff-error-handler.ts: ';

/**
 * クライアント／サーバー境界 エラーハンドリング.
 *
 * @remarks 引数に渡されたサンクにエラーハンドリングを追加して実行する。
 */
export async function withErrorHandlingAsync<RESULT, REASON>(
  thunk: () => Promise<BffResult<RESULT, REASON>>,
): Promise<BffResult<RESULT, REASON>> {
  const fname = 'withErrorHandlingAsync: ';
  try {
    return await thunk();
  } catch (e) {
    const { message, all } = stringify(e);
    logger.error(logPrefix + fname + all);
    return abort(message);
  }
}
