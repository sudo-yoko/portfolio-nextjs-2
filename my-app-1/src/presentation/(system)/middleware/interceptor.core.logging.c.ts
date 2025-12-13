//
// ロギングインターセプター（クライアントサイド用）
//
import 'client-only';

import logger from '@/presentation/(system)/logging/logger.c';

export function withLogging<T>(
  { logPrefix, process }: { logPrefix: string; process: string },
  thunk: () => T,
): T {
  logger.info(`${logPrefix} ${process} start.`);
  const result = thunk();
  logger.info(`${logPrefix} ${process} end.`);
  return result;
}

export async function withLoggingAsync<T>(
  { logPrefix, process }: { logPrefix: string; process: string },
  thunk: () => Promise<T>,
): Promise<T> {
  logger.info(`${logPrefix} ${process} start.`);
  const result = await thunk();
  logger.info(`${logPrefix} ${process} end.`);
  return result;
}
