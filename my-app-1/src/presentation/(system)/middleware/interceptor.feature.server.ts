//
// サーバーサイド共通処理
// 高階関数を使って共通処理をパイプライン方式で実行するレイヤー
//
import 'server-only';

import {
  withErrorHandling,
  withErrorHandlingAsync,
} from '@/presentation/(system)/middleware/interceptor.core.error-handling.server';
import { withAuth, withAuthAsync } from '@/presentation/(system)/middleware/interceptor.core.auth';
import { withLogging, withLoggingAsync } from '@/presentation/(system)/middleware/interceptor.core.logging.s';

const logPrefix = 'interceptor.server.ts: ';

/**
 * 引数に渡されたサンクにサーバーサイド共通処理を挟んで実行する
 */
export function withInterception<T>(thunk: () => T): T {
  const process = 'sync server process';
  return withLogging({ logPrefix, process }, () => withErrorHandling(() => withAuth(thunk)));
}

/**
 * 引数に渡されたサンクにサーバーサイド共通処理を挟んで実行する（非同期処理用）
 */
export async function withInterceptionAsync<T>(thunk: () => Promise<T>): Promise<T> {
  const process = 'async server process';
  return withLoggingAsync({ logPrefix, process }, () => withErrorHandlingAsync(() => withAuthAsync(thunk)));
}
