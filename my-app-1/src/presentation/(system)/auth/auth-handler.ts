import { authError } from '@/presentation/(system)/errors/error.factories';
import { stringify } from '@/presentation/(system)/errors/error.stringify';
import logger from '@/presentation/(system)/logging/logger.s';
import 'server-only';
import { isAuthError } from '../errors/error.helpers';

const logPrefix = 'auth-handler.ts: ';

/**
 * 引数に渡されたサンクに認証処理を追加して実行する
 */
export async function withAuthAsync<T>(thunk: () => Promise<T>): Promise<T> {
  const fname = 'withAuthAsync: ';
  try {
    if (process.env['AUTH_ERROR']) {
      throw authError();
    }
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
