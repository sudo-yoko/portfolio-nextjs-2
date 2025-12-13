import 'client-only';

import {
  withErrorHandling,
  withErrorHandlingAsync,
} from '@/presentation/(system)/middleware/interceptor.core.exception.client';
import { withLogging, withLoggingAsync } from '@/presentation/(system)/middleware/interceptor.core.logging.c';

const logPrefix = 'interceptor.feature.client.ts';

export function withInterception<T>(
  thunk: () => T,
  setHasError: React.Dispatch<React.SetStateAction<boolean>>,
): T | void {
  const process = 'sync client process';
  return withLogging({ logPrefix, process }, () => withErrorHandling(thunk, setHasError));
}

export async function withInterceptionAsync<T>(
  thunk: () => Promise<T>,
  setHasError: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<T | void> {
  const process = 'async client process';
  return withLoggingAsync({ logPrefix, process }, () => withErrorHandlingAsync(thunk, setHasError));
}
