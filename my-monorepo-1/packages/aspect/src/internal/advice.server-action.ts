import 'server-only';

import logger from '@my/logger/server';
import { RESULT } from '@my/result';

import { withAuth, withAuthAsync } from '#aspect/internal/aspects/aspect.auth';
import { withErrorHandling, withErrorHandlingAsync } from '#aspect/internal/aspects/aspect.error-handling.bff';
import { createWithLogging, createWithLoggingAsync, Ctx } from '#aspect/internal/aspects/aspect.logging';
import { withResultParsing, withResultParsingAsync } from '#aspect/internal/aspects/aspect.result.action';

const logPrefix = 'aspect.server-action.ts';

export function withAdvice(subject: () => RESULT): RESULT {
    const ctx: Ctx = { logger, logPrefix, process: 'sync action process' };
    const withLogging = createWithLogging(ctx);
    const chained = withLogging(withResultParsing(withErrorHandling(withAuth(subject))));
    return chained();
}

export async function withAdviceAsync(subject: () => Promise<RESULT>): Promise<RESULT> {
    const ctx: Ctx = { logger, logPrefix, process: 'async action process' };
    const withLoggingAsync = createWithLoggingAsync(ctx);
    const chained = withLoggingAsync(withResultParsingAsync(withErrorHandlingAsync(withAuthAsync(subject))));
    return await chained();
}
