//
// Route Handlers境界で共通の前後処理を行う
//
import 'server-only';

import logger from '@my/logger/server';
import { RESULT } from '@my/result';

import { withAuthAsync } from '#aspect/internal/aspect.auth';
import { withErrorHandlingAsync } from '#aspect/internal/aspect.error-handling.bff';
import { createWithLoggingAsync, Ctx } from '#aspect/internal/aspect.logging';
import { withResponseAsync } from '#aspect/internal/aspect.result.route';

const logPrefix = 'aspect.route-handler.ts: ';

export async function withAdviceAsync(subject: () => Promise<RESULT>): Promise<Response> {
    // サーバーサイドロガーを設定してロギングアスペクトを作成する
    const ctx: Ctx = { logger, logPrefix, process: 'bff route process' };
    const withLoggingAsync = createWithLoggingAsync(ctx);

    const chained = withLoggingAsync(withResponseAsync(withErrorHandlingAsync(withAuthAsync(subject))));
    return chained();
}
