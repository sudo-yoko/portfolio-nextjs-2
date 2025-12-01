import 'server-only';

import { abort } from '@/presentation/(system)/bff/bff.result.factories';
import type { BffResult } from '@/presentation/(system)/bff/bff.result.types';
import { stringify } from '@/presentation/(system)/errors/stringify-error';
import logger from '@/presentation/(system)/logging/logger.s';

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
    return abort({ cause: message });
  }
}
