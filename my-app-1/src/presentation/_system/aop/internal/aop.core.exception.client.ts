// エラーハンドリングAOP部品
import 'client-only';

import { formatError } from '@/presentation/_system/error/error.helper.stringify';
import logger from '@/presentation/_system/logging/logger.c';

const logPrefix = 'aop.core.exception.client.ts: ';

/**
 * 引数に渡されたサンクにエラーハンドリングを追加して実行する。
 */
export function withErrorHandling<T>(thunk: () => T, onAbort: () => void): T | void {
    const fname = 'withErrorHandling: ';
    try {
        // 引数に渡されたサンクを実行
        return thunk();
    } catch (error) {
        // TODO: クライアントサイドにも認証エラーチェックつけるか
        // TODO: クライアントサイドでBffRESULTのパースエラーチェック
        // NOTE: 非同期関数を呼ぶときにvoidを付けると、awaitしないことを明示的に示せる
        void logger.errorAsync(logPrefix + fname + formatError({ error }).all);
        // setHasError(true);
        onAbort();
    }
}

/**
 * 引数に渡されたサンクにエラーハンドリングを追加して実行する。
 */
export async function withErrorHandlingAsync<T>(
    thunk: () => Promise<T>,
    onAbort: () => void,
): Promise<T | void> {
    const fname = 'withErrorHandlingAsync: ';
    try {
        return await thunk();
    } catch (error) {
        // エラーログをサーバーに送信
        void logger.errorAsync(logPrefix + fname + formatError({ error }).all);
        onAbort();
    }
}
