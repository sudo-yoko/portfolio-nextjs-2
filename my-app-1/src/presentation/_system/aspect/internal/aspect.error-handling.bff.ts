// 共通の前後処理（AOP）：BFFエラーハンドリング
// エラーハンドリングAOP部品
import 'server-only';

import { AopResult } from '@/presentation/_system/aspect/aspect.types';
import { formatError, getCustomErrorProperties } from '@/presentation/_system/error/error.helper.stringify';
import { isCustomError, isRetryableError } from '@/presentation/_system/error/error.helpers';
import logger from '@/presentation/_system/logging/logger.s';
import { abort, retry } from '@/presentation/_system/result/result.factories';
import { RESULT } from '@/presentation/_system/result/result.types';

const logPrefix = 'aspect.error-handling.bff.ts: ';

/**
 * エラーハンドリングを追加して実行する
 * 
 * @param subject 実行する関数（RESULT型を返す関数であること）
 * @returns 正常時：関数の戻り値をそのまま返す、エラー時：エラー系のRESULT型を返す
 */
export function withErrorHandling(subject: () => RESULT): RESULT {
    const location = 'withErrorHandling';
    try {
        return subject();
    } catch (e) {
        return handleError(location, e);
    }
}

/**
 * エラーハンドリングを追加して実行する
 * 
 * @param subject 実行する非同期関数（RESULT型を返す関数であること）
 * @returns 正常時：関数の戻り値をそのまま返す、エラー時：エラー系のRESULT型を返す
 */
export async function withErrorHandlingAsync(subject: () => Promise<RESULT>): Promise<RESULT> {
    const location = 'withErrorHandlingAsync';
    try {
        return await subject();
    } catch (e) {
        return handleError(location, e);
    }
}

function handleError(location: string, e: unknown): AopResult {
    const errProps: Parameters<typeof formatError>[0] = {};
    const abortProps: Parameters<typeof abort>[0] = {};

    errProps.error = e;
    errProps.location = location;
    // カスタムエラー固有のプロパティを取得する
    if (isCustomError(e)) {
        const option = getCustomErrorProperties(e);
        errProps.option = option;
        abortProps.type = option.errType;
        abortProps.code = option.code;
    }
    // ログ出力
    const { message, all } = formatError(errProps);
    logger.error(logPrefix + all);

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
