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
    const location = 'withErrorHandling';
    try {
        // 引数に渡されたサンクを実行
        return thunk();
    } catch (error) {
        // TODO: クライアントサイドにも認証エラーチェックつけるか
        // TODO: クライアントサイドでBffRESULTのパースエラーチェック
        // NOTE: 非同期関数を呼ぶときにvoidを付けると、awaitしないことを明示的に示せる
        // void logger.errorAsync(logPrefix + fname + formatError({ error }).all);
        void handleError(location, error);
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
    const location = 'withErrorHandlingAsync';
    try {
        return await thunk();
    } catch (error) {
        // エラーログをサーバーに送信
        // void logger.errorAsync(logPrefix + fname + formatError({ error }).all);
        void handleError(location, error);
        onAbort();
    }
}

async function handleError(location: string, e: unknown): Promise<void> {
    const errProps: Parameters<typeof formatError>[0] = {};
    errProps.error = e;
    errProps.location = location;
    // カスタムエラー固有のプロパティを取得する
    if (isCustomError(e)) {
        const option = getCustomErrorProperties(e);
        errProps.option = option;
    }
    // ログ出力
    const { all } = formatError(errProps);
    void logger.errorAsync(logPrefix + all);
    throw e;
}
