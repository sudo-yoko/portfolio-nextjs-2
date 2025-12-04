//
// Route Handlers エラーハンドリング
//
import 'server-only';

import { abort } from '@/presentation/(system)/bff/bff.result.factories';
import { bffRouteResponse } from '@/presentation/(system)/bff/bff.result.factories.s';
import { stringify } from '@/presentation/(system)/errors/error.stringify';
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

    const result = abort({ cause: message });
    return bffRouteResponse(result);
  }
}
