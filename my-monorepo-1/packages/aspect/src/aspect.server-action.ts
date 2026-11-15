//
// ServerActions境界で共通の前後処理を行う
//
import 'server-only';

import { withAuth, withAuthAsync } from '#aspect/internal/aspect.auth';
import { withErrorHandling, withErrorHandlingAsync } from '#aspect/internal/aspect.error-handling.bff';
import { Ctx, withLogging, withLoggingAsync } from '#aspect/internal/aspect.logging';
import { withResultParsing, withResultParsingAsync } from '#aspect/internal/aspect.result.action';
import logger from '@my/logger/server';
import { RESULT } from '@my/result';

const logPrefix = 'aspect.server-action.ts';

/**
 * 引数に渡されたサンクに共通処理を追加して実行する。
 */
export function withAdvice(thunk: () => RESULT): RESULT {
    const ctx: Ctx = { logger, logPrefix, process: 'sync action process' };
    return withLogging(ctx, () => withResultParsing(() => withErrorHandling(() => withAuth(thunk))));
}

/**
 * 引数に渡されたサンクに共通処理を追加して実行する。
 */
export async function withAdviceAsync(thunk: () => Promise<RESULT>): Promise<RESULT> {
    const ctx: Ctx = { logger, logPrefix, process: 'async action process' };
    return await withLoggingAsync(ctx, () =>
        withResultParsingAsync(() => withErrorHandlingAsync(() => withAuthAsync(thunk))),
    );
}
