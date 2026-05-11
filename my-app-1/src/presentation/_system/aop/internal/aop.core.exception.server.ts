// エラーハンドリングAOP部品
import 'server-only';

import { formatError, getCustomErrorProperties } from '@/presentation/_system/error/error.helper.stringify';
import { isCustomError } from '@/presentation/_system/error/error.helpers';
import logger from '@/presentation/_system/logging/logger.s';

const logPrefix = 'aop.core.exception.server.ts: ';

/**
 * 引数に渡されたサンクにエラーハンドリングを追加して実行する。
 */
export function withErrorHandling<T>(thunk: () => T): T {
    const fname = 'withErrorHandling: ';
    try {
        // 引数に渡されたサンクを実行
        return thunk();
    } catch (error) {
        // logger.error(logPrefix + fname + formatError({ error }).all);
        handleError(fname, error);
        // 再スローすることで、Next.jsが未処理の例外としてキャッチしerror.tsxをレンダリングする。
        throw error;
    }
}

/**
 * 引数に渡されたサンクにエラーハンドリングを追加して実行する。
 */
export async function withErrorHandlingAsync<T>(thunk: () => Promise<T>): Promise<T> {
    const fname = 'withErrorHandlingAsync: ';
    try {
        return await thunk();
    } catch (error) {
        // logger.error(logPrefix + fname + formatError({ error }).all);
        handleError(fname, error);
        throw error;
    }
}

function handleError(fname: string, e: unknown): void {
    const errProps: Parameters<typeof formatError>[0] = {};
    if (isCustomError(e)) {
        // カスタムエラー固有のプロパティを取得する
        const { text } = getCustomErrorProperties(e);
        errProps.details = text;
    }
    // ログ出力
    errProps.error = e;
    const { all } = formatError(errProps);
    logger.error(logPrefix + fname + all);
}
