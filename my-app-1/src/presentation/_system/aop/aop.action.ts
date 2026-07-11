//
// ServerActions境界で共通の前後処理を行う
//
import 'server-only';

import { withAuth, withAuthAsync } from '@/presentation/_system/aop/internal/decorators/auth.decorator';
import {
    Ctx,
    withLogging,
    withLoggingAsync,
} from '@/presentation/_system/aop/internal/decorators/logging.decorator';
import {
    withErrorHandling,
    withErrorHandlingAsync,
} from '@/presentation/_system/aop/internal/decorators/resilience.decorator.bff';
import {
    withResultParsing,
    withResultParsingAsync,
} from '@/presentation/_system/aop/internal/decorators/result.decorator.action';
import logger from '@/presentation/_system/logging/logger.s';
import { RESULT } from '@/presentation/_system/result/result.types';

const logPrefix = 'aop.action.ts';

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
