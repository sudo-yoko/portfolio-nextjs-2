//
// Route Handlers境界で共通の前後処理を行う
//
import 'server-only';

import { withAuthAsync } from '@/presentation/_system/aspect/internal/aspect.auth';
import { withErrorHandlingAsync } from '@/presentation/_system/aspect/internal/aspect.error-handling.bff';
import { Ctx, withLoggingAsync } from '@/presentation/_system/aspect/internal/aspect.logging';
import { withResponseAsync } from '@/presentation/_system/aspect/internal/aspect.result.route';
import logger from '@/presentation/_system/logging/logger.s';
import { RESULT } from '@/presentation/_system/result/result.types';

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
