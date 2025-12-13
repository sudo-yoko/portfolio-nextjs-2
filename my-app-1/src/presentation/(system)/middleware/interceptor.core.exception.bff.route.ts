//
// エラーハンドリング インターセプター
//
import 'server-only';

import { bffRouteResponse } from '@/presentation/(system)/result/result.bff.factories.s';
import { isCustomError } from '@/presentation/(system)/error/error.helpers';
import { stringify } from '@/presentation/(system)/error/error.helper.stringify';
import { CUSTOM_ERROR_TAG } from '@/presentation/(system)/error/error.types';
import logger from '@/presentation/(system)/logging/logger.s';
import { abort } from '@/presentation/(system)/result/result.core.factories';

const logPrefix = 'route-error-handler.ts: ';

/**
 * 引数に渡されたサンクにエラーハンドリングを追加して実行する。
 */
export async function withErrorHandlingAsync(thunk: () => Promise<Response>): Promise<Response> {
  const fname = 'withErrorHandlingAsync: ';
  try {
    return await thunk();
  } catch (e) {
    const { message, all } = stringify(e);
    logger.error(logPrefix + fname + all);

    let args = {};
    if (isCustomError(e)) {
      args = { ...{ errType: e[CUSTOM_ERROR_TAG] } };
    }
    const result = abort({ message, ...args });
    return bffRouteResponse(result);
  }
}

export function withErrorHandling(thunk: () => Response): Response {
  const fname = 'withErrorHandling: ';
  try {
    return thunk();
  } catch (e) {
    const { message, all } = stringify(e);
    logger.error(logPrefix + fname + all);

    let args = {};
    if (isCustomError(e)) {
      args = { ...{ errType: e[CUSTOM_ERROR_TAG] } };
    }
    const result = abort({ message, ...args });
    return bffRouteResponse(result);
  }
}
