//
// エラーハンドリング インターセプター
//
import 'server-only';

import type { BffResult } from '@/presentation/(system)/result/result.bff.types';
import { isCustomError } from '@/presentation/(system)/error/error.helpers';
import { stringify } from '@/presentation/(system)/error/error.helper.stringify';
import { CUSTOM_ERROR_TAG } from '@/presentation/(system)/error/error.types';
import logger from '@/presentation/(system)/logging/logger.s';
import { abort } from '@/presentation/(system)/result/result.core.factories';

const logPrefix = 'error-handler.bff.ts: ';

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

export function withErrorHandling<DATA, FIELD extends string>(
  thunk: () => BffResult<DATA, FIELD>,
): BffResult<DATA, FIELD> {
  const fname = 'withErrorHandling: ';
  try {
    return thunk();
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
