//
// 認証インターセプター
//
import 'server-only';

import { authenticate } from '@/presentation/(system)/auth/authentication';
import { authError } from '@/presentation/(system)/error/error.factories';
import { stringify } from '@/presentation/(system)/error/error.helper.stringify';
import { isAuthError } from '@/presentation/(system)/error/error.helpers';
import logger from '@/presentation/(system)/logging/logger.s';

const logPrefix = 'auth-handler.ts: ';

/**
 * 引数に渡されたサンクに認証処理を追加して実行する
 */
export async function withAuthAsync<T>(thunk: () => Promise<T>): Promise<T> {
  const fname = 'withAuthAsync: ';
  try {
    authenticate();
    return await thunk();
  } catch (e) {
    if (isAuthError(e)) {
      // 認証エラーのみログに出力。スタックトレースは外側のwithErrorHandlingで出力させるようにし、ここではメッセージのみ出力する。
      // logger.error(logPrefix + fname + stringify(e).all);
      logger.error(logPrefix + fname + stringify(e).message);
    }
    // 認証エラー以外は外側のwithErrorHandlingで処理させる
    throw e;
  }
}

export function withAuth<T>(thunk: () => T): T {
  const fname = 'withAuth: ';
  try {
    if (process.env['AUTH_ERROR']) {
      throw authError();
    }
    return thunk();
  } catch (e) {
    if (isAuthError(e)) {
      logger.error(logPrefix + fname + stringify(e).message);
    }
    throw e;
  }
}
