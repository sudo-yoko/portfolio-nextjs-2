// 認証AOP部品
import 'server-only';

import { authenticate } from '@/presentation/(system)/auth/authentication';
import { stringify } from '@/presentation/(system)/error/error.helper.stringify';
import { isAuthError } from '@/presentation/(system)/error/error.helpers';
import logger from '@/presentation/(system)/logging/logger.s';

const logPrefix = 'aop.core.auth.ts: ';

/**
 * 引数に渡されたサンクに認証処理を追加して実行する。
 */
export function withAuth<T>(thunk: () => T): T {
    const fname = 'withAuth: ';
    try {
        // 認証
        authenticate();
        // 引数のサンクを実行
        return thunk();
    } catch (e) {
        if (isAuthError(e)) {
            // 認証エラーのみ補足する。ここではエラーメッセージだけ出して、
            // スタックトレースは外側のwithErrorHandlingでまとめて出すようにする
            logger.error(`${logPrefix}${fname}${stringify(e).message}`);
        }
        // 認証エラー以外は外側のwithErrorHandlingで処理させる
        throw e;
    }
}

/**
 * 引数に渡されたサンクに認証処理を追加して実行する。
 */
export async function withAuthAsync<T>(thunk: () => Promise<T>): Promise<T> {
    const fname = 'withAuthAsync: ';
    try {
        authenticate();
        return await thunk();
    } catch (e) {
        if (isAuthError(e)) {
            logger.error(`${logPrefix}${fname}${stringify(e).message}`);
        }
        throw e;
    }
}
