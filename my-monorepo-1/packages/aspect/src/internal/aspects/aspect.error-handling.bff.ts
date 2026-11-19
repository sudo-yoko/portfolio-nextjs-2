import 'server-only';

import { AopResult } from '#aspect/internal/aspect.types';
import {
    ERR_CODE,
    ERR_TYPE,
    formatError,
    getCustomErrorProperties,
    isCustomError,
    isRetryableError,
} from '@my/error';
import logger from '@my/logger/server';
import { abort, RESULT, retry } from '@my/result';

const logPrefix = 'aspect.error-handling.bff.ts: ';

export function withErrorHandling(thunk: () => RESULT): () => RESULT {
    return () => {
        const location = 'withErrorHandling';
        try {
            return thunk();
        } catch (e) {
            return handleError(location, e);
        }
    };
}

export function withErrorHandlingAsync(thunk: () => Promise<RESULT>): () => Promise<RESULT> {
    return async () => {
        const location = 'withErrorHandlingAsync';
        try {
            return await thunk();
        } catch (e) {
            return handleError(location, e);
        }
    };
}

function handleError(location: string, e: unknown): AopResult {
    const errProps: Parameters<typeof formatError>[0] = {};
    const abortProps: Parameters<typeof abort>[0] = {};

    errProps.error = e;
    errProps.location = location;
    // カスタムエラー固有のプロパティを取得する
    if (isCustomError(e)) {
        const option = getCustomErrorProperties(e);
        errProps.details = option;
        abortProps.type = e[ERR_TYPE];
        abortProps.code = e[ERR_CODE];
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
