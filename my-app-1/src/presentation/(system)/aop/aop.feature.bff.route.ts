//
// BFF(Route Handlers)共通処理
//
import 'server-only';

import { withAuthAsync } from '@/presentation/(system)/aop/aop.core.auth';
import { withErrorHandlingAsync } from '@/presentation/(system)/aop/aop.core.exception.bff.route';
import { Props, withLoggingAsync } from '@/presentation/(system)/aop/aop.core.logging.s';

const logPrefix = 'aop.feature.bff.route.ts: ';

/**
 * 引数に渡されたサンクに共通処理を追加して実行する。
 */
export async function executeAsync(thunk: () => Promise<Response>): Promise<Response> {
  const props: Props = { logPrefix, process: 'bff route process' };
  return await withLoggingAsync(props, () => withErrorHandlingAsync(() => withAuthAsync(thunk)));
}
