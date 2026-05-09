// 認証AOP部品
import 'server-only';

import { authenticate } from '@/presentation/_system/auth/authentication';
import { formatError } from '@/presentation/_system/error/error.helper.stringify';
import { isAuthError } from '@/presentation/_system/error/error.helpers';
import logger from '@/presentation/_system/logging/logger.s';

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
    } catch (error) {
        if (isAuthError(error)) {
            // 認証エラーのみ補足する。ここではエラーメッセージだけ出して、
            // スタックトレースは外側のwithErrorHandlingでまとめて出すようにする
            logger.error(`${logPrefix}${fname}${formatError({ error }).message}`);
        }
        // 認証エラー以外は外側のwithErrorHandlingで処理させる
        throw error;
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
    } catch (error) {
        // TODO: 認証エラーページに遷移。サーバーサイドとクラインとサイド
        if (isAuthError(error)) {
            logger.error(`${logPrefix}${fname}${formatError({ error }).message}`);
        }
        throw error;
    }
}
