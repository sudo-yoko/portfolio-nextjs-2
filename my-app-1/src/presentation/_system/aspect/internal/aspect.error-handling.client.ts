// 共通の前後処理（AOP）：クライアントサイドエラーハンドリング
// エラーハンドリングAOP部品
import 'client-only';

import { formatError, getCustomErrorProperties } from '@/presentation/_system/error/error.helper.stringify';
import { isCustomError } from '@/presentation/_system/error/error.helpers';
import logger from '@/presentation/_system/logging/logger.c';

const logPrefix = 'aspect.error-handling.client.ts: ';

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
        // void logger.errorAsync(logPrefix + fname + formatError({ error }).all);
        void handleError(fname, error);
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
        // void logger.errorAsync(logPrefix + fname + formatError({ error }).all);
        void handleError(fname, error);
        onAbort();
    }
}

async function handleError(fname: string, e: unknown): Promise<void> {
    const errProps: Parameters<typeof formatError>[0] = {};
    if (isCustomError(e)) {
        // カスタムエラー固有のプロパティを取得する
        const { text } = getCustomErrorProperties(e);
        errProps.details = text;
    }
    // ログ出力
    errProps.error = e;
    const { all } = formatError(errProps);
    void logger.errorAsync(logPrefix + fname + all);
    throw e;
}
