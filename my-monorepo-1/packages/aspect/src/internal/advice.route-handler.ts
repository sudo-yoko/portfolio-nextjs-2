//
// Route Handlers境界で共通の前後処理を行う
//
import 'server-only';

import logger from '@my/logger/server';
import { RESULT } from '@my/result';

import { withAuthAsync } from '#aspect/internal/aspects/aspect.auth';
import { withErrorHandlingAsync } from '#aspect/internal/aspects/aspect.error-handling.bff';
import { createWithLoggingAsync, Ctx } from '#aspect/internal/aspects/aspect.logging';
import { withResponseAsync } from '#aspect/internal/aspects/aspect.result.route';

const logPrefix = 'aspect.route-handler.ts: ';

export async function withAdviceAsync(subject: () => Promise<RESULT>): Promise<Response> {
    // サーバーサイドロガーを設定してロギングアスペクトを作成する
    const ctx: Ctx = { logger, logPrefix, process: 'bff route process' };
    const withLoggingAsync = createWithLoggingAsync(ctx);

    const chained = withResponseAsync(withErrorHandlingAsync(withLoggingAsync(withAuthAsync(subject))));
    return chained();
}
