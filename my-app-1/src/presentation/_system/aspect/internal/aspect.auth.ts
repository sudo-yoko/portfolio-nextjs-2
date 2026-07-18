// 共通の前後処理（AOP）：認証
// 認証AOP部品
import 'server-only';

import { authenticate } from '@/presentation/_system/auth/authentication';
import { formatError } from '@/presentation/_system/error/error.helper.stringify';
import { isAuthError } from '@/presentation/_system/error/error.helpers';
import logger from '@/presentation/_system/logging/logger.s';
import { LogPrefix } from '@/presentation/_system/logging/logging.utils';

const moduleName = 'aspect.auth.ts';

/**
 * 引数に渡されたサンクに認証処理を追加して実行する。
 */
// TODO: thunkをsubjectに修正する
/**
 *
 * @param subject アドバイスを適用する対象の処理
 * @returns
 */
export function withAuth<T>(subject: () => T): T {
    const logPrefix = LogPrefix.format({ moduleName, functionName: 'withAuth' });
    try {
        // 認証
        authenticate();
        // 引数のサンクを実行
        return subject();
    } catch (error) {
        if (isAuthError(error)) {
            // 認証エラーのみ補足する。ここではエラーメッセージだけ出して、
            // スタックトレースは外側のwithErrorHandlingでまとめて出すようにする
            logger.error(logPrefix + formatError({ error }).message);
        }
        // 認証エラー以外は外側のwithErrorHandlingで処理させる
        throw error;
    }
}

/**
 * 引数に渡されたサンクに認証処理を追加して実行する。
 */
export async function withAuthAsync<T>(subject: () => Promise<T>): Promise<T> {
    const logPrefix = LogPrefix.format({ moduleName, functionName: 'withAuthAsync' });
    try {
        authenticate();
        return await subject();
    } catch (error) {
        // TODO: 認証エラーページに遷移。サーバーサイドとクライアントサイド
        if (isAuthError(error)) {
            logger.error(logPrefix + formatError({ error }).message);
        }
        throw error;
    }
}
