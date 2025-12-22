// エラーハンドリングAOP部品
import 'server-only';

import { stringify } from '@/presentation/(system)/error/error.helper.stringify';
import { isCustomError } from '@/presentation/(system)/error/error.helpers';
import { CUSTOM_ERROR_TAG } from '@/presentation/(system)/error/error.types';
import logger from '@/presentation/(system)/logging/logger.s';
import { abort } from '@/presentation/(system)/result/result.core.factories';
import { RESULT } from '@/presentation/(system)/result/result.core.types';

const logPrefix = 'aop.core.exception.bff.action.ts: ';

/**
 * 引数に渡されたサンクにエラーハンドリングを追加して実行する。
 */
export async function _withErrorHandlingAsync(thunk: () => Promise<RESULT>): Promise<RESULT> {
  const fname = 'withErrorHandlingAsync: ';
  try {
    return await thunk();
  } catch (e) {
    const { message, all } = stringify(e);
    logger.error(logPrefix + fname + all);

    const aborted = abort({ message });
    if (isCustomError(e)) {
      aborted.errType = e[CUSTOM_ERROR_TAG];
    }
    return aborted;
  }
}

/**
 * 引数に渡されたサンクにエラーハンドリングを追加して実行する。
 */
export function _withErrorHandling(thunk: () => RESULT): RESULT {
  const fname = 'withErrorHandling: ';
  try {
    return thunk();
  } catch (e) {
    const { message, all } = stringify(e);
    logger.error(logPrefix + fname + all);

    const aborted = abort({ message });
    if (isCustomError(e)) {
      aborted.errType = e[CUSTOM_ERROR_TAG];
    }
    return aborted;
  }
}
