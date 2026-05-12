// エラーハンドリングAOP部品
import 'server-only';

import { formatError } from '@/presentation/_system/error/error.helper.stringify';
import { isCustomError } from '@/presentation/_system/error/error.helpers';
import { ERR_TYPE } from '@/presentation/_system/error/error.types';
import logger from '@/presentation/_system/logging/logger.s';
import { abort } from '@/presentation/_system/result/result.factories';
import { RESULT } from '@/presentation/_system/result/result.types';

const logPrefix = 'aop.core.exception.bff.action.ts: ';

/**
 * 引数に渡されたサンクにエラーハンドリングを追加して実行する。
 */
export async function _withErrorHandlingAsync(thunk: () => Promise<RESULT>): Promise<RESULT> {
    const fname = 'withErrorHandlingAsync: ';
    try {
        return await thunk();
    } catch (error) {
        const { message, all } = formatError({ error });
        logger.error(logPrefix + fname + all);

        const aborted = abort({ message });
        if (isCustomError(error)) {
            aborted.errType = error[ERR_TYPE];
        }
        return aborted;
    }
}

/**
 * 引数に渡されたサンクにエラーハンドリングを追加して実行する。
 */
export function _withErrorHandling(thunk: () => RESULT): RESULT {
    const fname = 'withErrorHandling: ';
    try {
        return thunk();
    } catch (error) {
        const { message, all } = formatError({ error });
        logger.error(logPrefix + fname + all);

        const aborted = abort({ message });
        if (isCustomError(error)) {
            aborted.errType = error[ERR_TYPE];
        }
        return aborted;
    }
}
