// 共通の前後処理（AOP）：サーバーサイドエラーハンドリング
// エラーハンドリングAOP部品
import 'server-only';

import { redirect } from 'next/navigation';

import { formatError, getCustomErrorProperties } from '@/presentation/_system/error/error.helper.stringify';
import { isAuthError, isCustomError } from '@/presentation/_system/error/error.helpers';
import logger from '@/presentation/_system/logging/logger.s';
import { LogPrefix } from '@/presentation/_system/logging/logging.utils';

const moduleName = 'aspect.error-handling.server.ts';

/**
 * 引数に渡されたサンクにエラーハンドリングを追加して実行する。
 */
export function withErrorHandling<T>(thunk: () => T): T {
    const logPrefix = LogPrefix.format({ moduleName, functionName: 'withErrorHandling' });
    try {
        // 引数に渡されたサンクを実行
        return thunk();
    } catch (error) {
        // logger.error(logPrefix + fname + formatError({ error }).all);
        handleError(logPrefix, error);
        // 再スローすることで、Next.jsが未処理の例外としてキャッチしerror.tsxをレンダリングする。
        throw error;
    }
}

/**
 * 引数に渡されたサンクにエラーハンドリングを追加して実行する。
 */
export async function withErrorHandlingAsync<T>(thunk: () => Promise<T>): Promise<T> {
    const logPrefix = LogPrefix.format({ moduleName, functionName: 'withErrorHandlingAsync' });
    try {
        return await thunk();
    } catch (error) {
        // logger.error(logPrefix + fname + formatError({ error }).all);
        handleError(logPrefix, error);
        throw error;
    }
}

function handleError(logPrefix: string, e: unknown): void {
    const errProps: Parameters<typeof formatError>[0] = {};
    if (isCustomError(e)) {
        // カスタムエラー固有のプロパティを取得する
        const { text } = getCustomErrorProperties(e);
        errProps.details = text;
    }
    // ログ出力
    errProps.error = e;
    const { all } = formatError(errProps);
    logger.error(logPrefix + all);
    if (isAuthError(e)) {
        redirect('/auth-error');
    }
}
