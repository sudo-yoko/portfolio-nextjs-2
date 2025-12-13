import 'server-only';

import { withErrorHandling, withErrorHandlingAsync } from '@/presentation/(system)/error/error.handler.bff';
import { withAuth, withAuthAsync } from '@/presentation/(system)/middleware/interceptor.core.auth';
import { withLogging, withLoggingAsync } from '@/presentation/(system)/middleware/interceptor.core.logging.s';
import { BffResult } from '@/presentation/(system)/result/result.bff.types';

const logPrefix = 'interceptor.feature.bff.ts';

export function withInterception<DATA, FIELD extends string>(
  thunk: () => BffResult<DATA, FIELD>,
): BffResult<DATA, FIELD> {
  const process = 'sync bff process';
  return withLogging({ logPrefix, process }, () => withErrorHandling(() => withAuth(thunk)));
}

export async function withInterceptionAsync<DATA, FIELD extends string>(
  thunk: () => Promise<BffResult<DATA, FIELD>>,
): Promise<BffResult<DATA, FIELD>> {
  const process = 'async bff process';
  return withLoggingAsync({ logPrefix, process }, () => withErrorHandlingAsync(() => withAuthAsync(thunk)));
}
