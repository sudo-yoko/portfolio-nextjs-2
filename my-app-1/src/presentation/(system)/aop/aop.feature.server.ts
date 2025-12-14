//
// サーバーサイド共通処理
// 高階関数を使って共通処理をパイプライン方式で実行するレイヤー
//
import 'server-only';

import { withAuth, withAuthAsync } from '@/presentation/(system)/aop/aop.core.auth';
import {
  withErrorHandling,
  withErrorHandlingAsync,
} from '@/presentation/(system)/aop/aop.core.exception.server';
import { withLogging, withLoggingAsync } from '@/presentation/(system)/aop/aop.core.logging.s';

const logPrefix = 'interceptor.server.ts: ';

/**
 * 引数に渡されたサンクにサーバーサイド共通処理を挟んで実行する
 */
export function execute<T>(thunk: () => T): T {
  const args = { logPrefix, process: 'sync server process' };
  return withLogging(args, () => withErrorHandling(() => withAuth(thunk)));
}

/**
 * 引数に渡されたサンクにサーバーサイド共通処理を挟んで実行する（非同期処理用）
 */
export async function executeAsync<T>(thunk: () => Promise<T>): Promise<T> {
  const args = { logPrefix, process: 'async server process' };
  return withLoggingAsync(args, () => withErrorHandlingAsync(() => withAuthAsync(thunk)));
}
