import 'server-only';

import { abort } from '@/presentation/(system)/bff/bff.result.factories';
import { bffRouteResponse } from '@/presentation/(system)/bff/bff.result.factories.s';
import { isAuthError } from '@/presentation/(system)/errors/error.helpers';
import { ErrType } from '@/presentation/(system)/errors/error.types';
import { stringify } from '@/presentation/(system)/errors/error.stringify';
import logger from '@/presentation/(system)/logging/logger.s';

const logPrefix = 'bff.error-handling.route.ts: ';

export async function withErrorHandlingAsync(thunk: () => Promise<Response>): Promise<Response> {
  const fname = 'withErrorHandlingAsync: ';
  try {
    return await thunk();
  } catch (e) {
    const { all, message } = stringify(e);
    logger.error(logPrefix + fname + `${all}`);

    if (isAuthError(e)) {
      const authError = abort({ type: ErrType.AuthError, cause: message });
      return bffRouteResponse(authError);
    }
    const result = abort({ cause: message });
    return bffRouteResponse(result);
  }
}
