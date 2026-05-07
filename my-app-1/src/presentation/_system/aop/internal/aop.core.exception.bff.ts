// エラーハンドリングAOP部品
import 'server-only';

import { getCustomErrorProperties, stringify } from '@/presentation/_system/error/error.helper.stringify';
import { CUSTOM_ERROR_TAG, ERR_CODE } from '@/presentation/_system/error/error.types';
import logger from '@/presentation/_system/logging/logger.s';
import { abort } from '@/presentation/_system/result/result.core.factories';
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

function handleError(fname: string, e: unknown): RESULT {
    // カスタムエラー固有のプロパティを取得する
    // TODO: getCustomErrorPropertiesを使用
    const { obj, text } = getCustomErrorProperties(e);

    // ログ出力
    const { message, all } = stringify({ error: e, details: text });
    logger.error(logPrefix + fname + all);

    // RESULT型
    const props: Parameters<typeof abort>[0] = {
        message,
    };
    props.errType = obj[CUSTOM_ERROR_TAG];
    props.code = obj[ERR_CODE];
    return abort(props);
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
