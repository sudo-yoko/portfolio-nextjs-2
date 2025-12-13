import 'client-only';

import {
  withErrorHandling,
  withErrorHandlingAsync,
} from '@/presentation/(system)/error/error.handler.client';

export function withInterception<T>(
  thunk: () => T,
  setHasError: React.Dispatch<React.SetStateAction<boolean>>,
): T | void {
  return withErrorHandling(thunk, setHasError);
}

export async function withInterceptionAsync<T>(
  thunk: () => Promise<T>,
  setHasError: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<T | void> {
  return withErrorHandlingAsync(thunk, setHasError);
}
