//
// BFF(Server Actions)共通処理
//
import 'server-only';

import { withAuth, withAuthAsync } from '@/presentation/_system/aop/aop.core.auth';
import {
    withErrorHandling,
    withErrorHandlingAsync,
} from '@/presentation/_system/aop/aop.core.exception.bff';
import { Ctx, withLogging, withLoggingAsync } from '@/presentation/_system/aop/aop.core.logging';
import {
    withResultParsing,
    withResultParsingAsync,
} from '@/presentation/_system/aop/aop.core.result.bff.action';
import logger from '@/presentation/_system/logging/logger.s';
import { RESULT } from '@/presentation/_system/result/result.core.types';

const logPrefix = 'aop.feature.bff.ts';

/**
 * 引数に渡されたサンクに共通処理を追加して実行する。
 */
export function execute(thunk: () => RESULT): RESULT {
    const ctx: Ctx = { logger, logPrefix, process: 'sync action process' };
    return withLogging(ctx, () => withResultParsing(() => withErrorHandling(() => withAuth(thunk))));
}

/**
 * 引数に渡されたサンクに共通処理を追加して実行する。
 */
export async function executeAsync(thunk: () => Promise<RESULT>): Promise<RESULT> {
    const ctx: Ctx = { logger, logPrefix, process: 'async action process' };
    return await withLoggingAsync(ctx, () =>
        withResultParsingAsync(() => withErrorHandlingAsync(() => withAuthAsync(thunk))),
    );
}
