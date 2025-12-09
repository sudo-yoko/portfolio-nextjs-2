import 'server-only';

import type { BffResult } from '@/presentation/(system)/result/result.bff.types';
import { isCustomError } from '@/presentation/(system)/errors/error.helpers';
import { stringify } from '@/presentation/(system)/errors/error.stringify';
import { CUSTOM_ERROR_TAG } from '@/presentation/(system)/errors/error.types';
import logger from '@/presentation/(system)/logging/logger.s';
import { abort } from '@/presentation/(system)/result/result.core.factories';

const logPrefix = 'bff-error-handler.ts: ';

/**
 * クライアント／サーバー境界 エラーハンドリング.
 *
 * @remarks 引数に渡されたサンクにエラーハンドリングを追加して実行する。
 */
export async function withErrorHandlingAsync<DATA, FIELD extends string>(
  thunk: () => Promise<BffResult<DATA, FIELD>>,
): Promise<BffResult<DATA, FIELD>> {
  const fname = 'withErrorHandlingAsync: ';
  try {
    return await thunk();
  } catch (e) {
    const { message, all } = stringify(e);
    logger.error(logPrefix + fname + all);

    let args = {};
    if (isCustomError(e)) {
      args = { errType: e[CUSTOM_ERROR_TAG] };
    }
    return abort({ message, ...args });
  }
}
