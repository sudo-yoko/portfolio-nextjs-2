import 'server-only';

import { withErrorHandlingAsync } from '@/presentation/(system)/error/error.handler.bff.route';
import { withAuthAsync } from '@/presentation/(system)/middleware/interceptor.core.auth';
import { withLoggingAsync } from '@/presentation/(system)/middleware/interceptor.core.logging.s';

const logPrefix = 'interceptor.bff.route.ts: ';

export async function withInterceptionAsync(thunk: () => Promise<Response>): Promise<Response> {
  const process = 'bff route process';
  return withLoggingAsync({ logPrefix, process }, () => withErrorHandlingAsync(() => withAuthAsync(thunk)));
}
