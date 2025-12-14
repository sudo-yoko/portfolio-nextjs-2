//
// BFF(Route Handlers)の共通処理
//
import 'server-only';

import { withAuthAsync } from '@/presentation/(system)/aop/aop.core.auth';
import { withErrorHandlingAsync } from '@/presentation/(system)/aop/aop.core.exception.bff.route';
import { withLoggingAsync } from '@/presentation/(system)/aop/aop.core.logging.s';

const logPrefix = 'interceptor.bff.route.ts: ';

/**
 * 引数に渡されたサンクに共通処理を介入させて実行する
 */
export async function executeAsync(thunk: () => Promise<Response>): Promise<Response> {
  const args = { logPrefix, process: 'bff route process' };
  return withLoggingAsync(args, () => withErrorHandlingAsync(() => withAuthAsync(thunk)));
}
