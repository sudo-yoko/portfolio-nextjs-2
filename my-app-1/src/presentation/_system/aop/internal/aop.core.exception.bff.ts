// エラーハンドリングAOP部品
import 'server-only';

import { AopResult } from '@/presentation/_system/aop/aop.types';
import { formatError, getCustomErrorProperties } from '@/presentation/_system/error/error.helper.stringify';
import { isCustomError, isRetryableError } from '@/presentation/_system/error/error.helpers';
import logger from '@/presentation/_system/logging/logger.s';
import { abort, retry } from '@/presentation/_system/result/result.core.factories';
import { RESULT } from '@/presentation/_system/result/result.core.types';

const logPrefix = 'aop.core.exception.bff.ts: ';

/**
 * 引数に渡されたサンクにエラーハンドリングを追加して実行する。
 */
export function withErrorHandling(thunk: () => RESULT): RESULT {
    const fname = 'withErrorHandling: ';
    try {
        return thunk();
    } catch (e) {
        return handleError(fname, e);
    }
}

/**
 * 引数に渡されたサンクにエラーハンドリングを追加して実行する。
 */
export async function withErrorHandlingAsync(thunk: () => Promise<RESULT>): Promise<RESULT> {
    const fname = 'withErrorHandlingAsync: ';
    try {
        return await thunk();
    } catch (e) {
        return handleError(fname, e);
    }
}

function handleError(fname: string, e: unknown): AopResult {
    const errProps: Parameters<typeof formatError>[0] = {};
    const abortProps: Parameters<typeof abort>[0] = {};

    if (isCustomError(e)) {
        // カスタムエラー固有のプロパティを取得する
        const { obj, text } = getCustomErrorProperties(e);
        errProps.details = text;
        abortProps.type = obj.errType;
        abortProps.code = obj.code;
    }

    // ログ出力
    errProps.error = e;
    const { message, all } = formatError(errProps);
    logger.error(logPrefix + fname + all);

    // RESULT型
    if (isRetryableError(e)) {
        return retry();
    }
    abortProps.message = message;
    return abort(abortProps);
}

// function handleError(fname: string, e: unknown): RESULT {
//     const { message, all } = stringify({ error: e });
//     logger.error(logPrefix + fname + all);
//     //
//     // 再試行可能エラー
//     //
//     if (isRetryableError(e)) {
//         const retryable = retry();
//         // return resultResponse(retryable);
//         return retryable;
//     }
//     //
//     // その他続行不可能なエラー
//     //
//     const aborted = abort({ message });
//     if (isCustomError(e)) {
//         aborted.errType = e[CUSTOM_ERROR_TAG];
//     }
//     return aborted;
// }
