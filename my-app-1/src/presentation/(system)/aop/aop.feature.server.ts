//
// サーバーサイド共通処理
//
import 'server-only';

import { withAuth, withAuthAsync } from '@/presentation/(system)/aop/aop.core.auth';
import {
  withErrorHandling,
  withErrorHandlingAsync,
} from '@/presentation/(system)/aop/aop.core.exception.server';
import { Props, withLogging, withLoggingAsync } from '@/presentation/(system)/aop/aop.core.logging.s';

const logPrefix = 'aop.feature.server.ts: ';

/**
 * 引数に渡されたサンクに共通処理を追加して実行する。
 */
export function execute<T>(thunk: () => T): T {
  const props: Props = { logPrefix, process: 'sync server process' };
  return withLogging(props, () => withErrorHandling(() => withAuth(thunk)));
}

/**
 * 引数に渡されたサンクに共通処理を追加して実行する。
 */
export async function executeAsync<T>(thunk: () => Promise<T>): Promise<T> {
  const props: Props = { logPrefix, process: 'async server process' };
  return await withLoggingAsync(props, () => withErrorHandlingAsync(() => withAuthAsync(thunk)));
}
