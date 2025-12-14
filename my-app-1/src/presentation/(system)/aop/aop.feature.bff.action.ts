//
// BFF(Server Actions)共通処理
//
import 'server-only';

import { withAuth, withAuthAsync } from '@/presentation/(system)/aop/aop.core.auth';
import {
  withErrorHandling,
  withErrorHandlingAsync,
} from '@/presentation/(system)/aop/aop.core.exception.bff.action';
import { Props, withLogging, withLoggingAsync } from '@/presentation/(system)/aop/aop.core.logging.s';
import { BffResult } from '@/presentation/(system)/result/result.bff.types';

const logPrefix = 'aop.feature.bff.ts';

/**
 * 引数に渡されたサンクに共通処理を追加して実行する。
 */
export function execute<DATA, FIELD extends string>(
  thunk: () => BffResult<DATA, FIELD>,
): BffResult<DATA, FIELD> {
  const props: Props = { logPrefix, process: 'sync bff process' };
  return withLogging(props, () => withErrorHandling(() => withAuth(thunk)));
}

/**
 * 引数に渡されたサンクに共通処理を追加して実行する。
 */
export async function executeAsync<DATA, FIELD extends string>(
  thunk: () => Promise<BffResult<DATA, FIELD>>,
): Promise<BffResult<DATA, FIELD>> {
  const props: Props = { logPrefix, process: 'async bff process' };
  return await withLoggingAsync(props, () => withErrorHandlingAsync(() => withAuthAsync(thunk)));
}
