//
// サーバーサイド共通処理
// 高階関数を使って共通処理をパイプライン方式で実行するレイヤー
//
import 'server-only';

import { withAuth, withAuthAsync } from '@/presentation/(system)/auth/auth-handler';
import {
  withErrorHandling,
  withErrorHandlingAsync,
} from '@/presentation/(system)/error/error.handler.server';

/**
 * 引数に渡されたサンクにサーバーサイド共通処理を挟んで実行する
 */
export function withInterception<T>(thunk: () => T): T {
  return withErrorHandling(() => withAuth(thunk));
}

/**
 * 引数に渡されたサンクにサーバーサイド共通処理を挟んで実行する（非同期処理用）
 */
export async function withInterceptionAsync<T>(thunk: () => Promise<T>): Promise<T> {
  return withErrorHandlingAsync(() => withAuthAsync(thunk));
}
