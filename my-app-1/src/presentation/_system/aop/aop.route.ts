//
// Route Handlers境界で共通の前後処理を行う
//
import 'server-only';

import { withAuthAsync } from '@/presentation/_system/aop/internal/decorators/auth.decorator';
import { Ctx, withLoggingAsync } from '@/presentation/_system/aop/internal/decorators/logging.decorator';
import { withErrorHandlingAsync } from '@/presentation/_system/aop/internal/decorators/resilience.decorator.bff';
import { withResponseAsync } from '@/presentation/_system/aop/internal/decorators/result.decorator.route';
import logger from '@/presentation/_system/logging/logger.s';
import { RESULT } from '@/presentation/_system/result/result.types';

const logPrefix = 'aop.route.ts: ';

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
