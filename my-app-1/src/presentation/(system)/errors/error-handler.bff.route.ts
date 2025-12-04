//
// Route Handlers エラーハンドリング
//
import 'server-only';

import { abort } from '@/presentation/(system)/bff/bff.result.factories';
import { bffRouteResponse } from '@/presentation/(system)/bff/bff.result.factories.s';
import { isCustomError } from '@/presentation/(system)/errors/error.helpers';
import { stringify } from '@/presentation/(system)/errors/error.stringify';
import { CUSTOM_ERROR_TAG } from '@/presentation/(system)/errors/error.types';
import logger from '@/presentation/(system)/logging/logger.s';

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
