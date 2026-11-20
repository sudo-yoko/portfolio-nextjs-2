import 'server-only';

import { AroundAdvice, AroundAdviceAsync } from '#aspect/internal/aspect.types';
import { envString } from '@my/env/server';
import { formatError, getCustomErrorProperties, isAuthError, isCustomError } from '@my/error';
import logger from '@my/logger/server';
import { redirectPage } from '@my/navigation/server';

const logPrefix = 'aspect.error-handling.server.ts: ';

export const withErrorHandling: AroundAdvice = (thunk) => {
    return () => {
        const location = 'withErrorHandling';
        try {
            // 引数に渡されたサンクを実行
            return thunk();
        } catch (error) {
            handleError(location, error);
        }
    };
};

export const withErrorHandlingAsync: AroundAdviceAsync = (thunk) => {
    return async () => {
        const location = 'withErrorHandlingAsync';
        try {
            return await thunk();
        } catch (error) {
            handleError(location, error);
        }
    };
};

function handleError(location: string, e: unknown): never {
    const errProps: Parameters<typeof formatError>[0] = {};
    if (isCustomError(e)) {
        // カスタムエラー固有のプロパティを取得する
        const option = getCustomErrorProperties(e);
        errProps.details = option;
    }
    // ログ出力
    errProps.error = e;
    errProps.location = location;

    const { all } = formatError(errProps);
    logger.error(logPrefix + all);

    // エラーページにリダイレクト
    if (isAuthError(e)) {
        const url = envString('AUTH_ERROR_DEFAULT');
        redirectPage(url);
    } else {
        const url = envString('SYSTEM_ERROR_DEFAULT');
        redirectPage(url);
    }
}
