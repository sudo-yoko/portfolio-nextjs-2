//
// Route Handlers境界で共通の前後処理を行う
//
import 'server-only';

import { withErrorHandlingAsync } from '#aspect/internal/aspect.error-handling.bff';
import { Ctx, withLoggingAsync } from '#aspect/internal/aspect.logging';
import { withResponseAsync } from '#aspect/internal/aspect.result.route';
import { withAuthAsync } from '@/presentation/_system/aspect/internal/aspect.auth';
import logger from '@my/logger/server';
import { RESULT } from '@my/result';

const logPrefix = 'aspect.route-handler.ts: ';

/**
 * 引数に渡されたサンクに共通処理を追加して実行する。
 */
export async function withAdviceAsync(thunk: () => Promise<RESULT>): Promise<Response> {
    const ctx: Ctx = { logger, logPrefix, process: 'bff route process' };
    // TODO: performance.now()で処理時間を取得
    return await withLoggingAsync(ctx, () =>
        withResponseAsync(() => withErrorHandlingAsync(() => withAuthAsync(thunk))),
    );
}
