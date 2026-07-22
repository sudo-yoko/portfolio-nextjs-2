// 共通の前後処理（AOP）：サーバーサイドエラーハンドリング
// エラーハンドリングAOP部品
import 'server-only';

import { redirect } from 'next/navigation';

import { formatError, getCustomErrorProperties } from '@/presentation/_system/error/error.helper.stringify';
import { isAuthError, isCustomError } from '@/presentation/_system/error/error.helpers';
import logger from '@/presentation/_system/logging/logger.s';

const logPrefix = 'aspect.error-handling.server.ts: ';

/**
 * エラーハンドリングを追加して実行する
 *
 * @param subject 実行する関数（戻り値はありorなし）
 * @returns 正常時：関数の戻り値をそのまま返す、エラー時：エラーページにリダイレクトする
 */
export function withErrorHandling<T>(subject: () => T) {
    const location = 'withErrorHandling';
    try {
        // 引数に渡されたサンクを実行
        return subject();
    } catch (error) {
        // logger.error(logPrefix + fname + formatError({ error }).all);
        handleError(location, error);
        // 再スローすることで、Next.jsが未処理の例外としてキャッチしerror.tsxをレンダリングする。
        // throw error;
        return redirectError(error);
    }
}

/**
 * エラーハンドリングを追加して実行する
 *
 * @param subject 実行する非同期関数（戻り値はありorなし）
 * @returns 正常時：関数の戻り値をそのまま返す、エラー時：エラーページにリダイレクトする
 */
export async function withErrorHandlingAsync<T>(subject: () => Promise<T>) {
    const location = 'withErrorHandlingAsync';
    try {
        return await subject();
    } catch (error) {
        // logger.error(logPrefix + fname + formatError({ error }).all);
        handleError(location, error);
        // throw error;
        return redirectError(error);
    }
}

function handleError(location: string, e: unknown) {
    const errProps: Parameters<typeof formatError>[0] = {};
    if (isCustomError(e)) {
        // カスタムエラー固有のプロパティを取得する
        const option = getCustomErrorProperties(e);
        errProps.option = option;
        // errProps.details = option.details;
    }
    // ログ出力
    errProps.error = e;
    errProps.location = location;

    const { all } = formatError(errProps);
    logger.error(logPrefix + all);
    // if (isAuthError(e)) {
    //     redirect('/auth-error');
    // }
    // // TODO: 上記以外はerror.tsxでキャッチ
}

// リダイレクトするため、戻らない関数(never)
function redirectError(e: unknown): never {
    if (isAuthError(e)) {
        redirect('/auth-error');
    }
    redirect('system-error');
}
