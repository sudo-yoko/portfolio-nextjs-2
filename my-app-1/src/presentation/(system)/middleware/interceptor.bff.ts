import 'server-only';

import { withAuth, withAuthAsync } from '@/presentation/(system)/auth/auth-handler';
import { withErrorHandling, withErrorHandlingAsync } from '@/presentation/(system)/error/error.handler.bff';
import { BffResult } from '@/presentation/(system)/result/result.bff.types';

export function withInterception<DATA, FIELD extends string>(
  thunk: () => BffResult<DATA, FIELD>,
): BffResult<DATA, FIELD> {
  return withErrorHandling(() => withAuth(thunk));
}

export async function withInterceptionAsync<DATA, FIELD extends string>(
  thunk: () => Promise<BffResult<DATA, FIELD>>,
): Promise<BffResult<DATA, FIELD>> {
  return withErrorHandlingAsync(() => withAuthAsync(thunk));
}
