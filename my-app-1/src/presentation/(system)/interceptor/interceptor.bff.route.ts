import 'server-only';

import { withAuth, withAuthAsync } from '@/presentation/(system)/auth/auth-handler';
import {
  withErrorHandling,
  withErrorHandlingAsync,
} from '@/presentation/(system)/errors/error.handler.bff.route';

export function withInterception(thunk: () => Response): Response {
  return withErrorHandling(() => withAuth(thunk));
}

export async function withInterceptionAsync(thunk: () => Promise<Response>): Promise<Response> {
  return withErrorHandlingAsync(() => withAuthAsync(thunk));
}
