// ロギングAOP部品
import 'client-only';

import logger from '@/presentation/(system)/logging/logger.c';

/**
 * 引数に渡されたサンクの前後にログ出力を追加して実行する
 */
export function withLogging<T>(
  { logPrefix, process }: { logPrefix: string; process: string },
  thunk: () => T,
): T {
  logger.info(`${logPrefix}>>>>>>>>>>>>>>>>>>>>> ${process} start.`);
  const result = thunk();
  logger.info(`${logPrefix}<<<<<<<<<<<<<<<<<<<<< ${process} end.`);
  return result;
}

/**
 * 引数に渡されたサンクの前後にログ出力を追加して実行する
 */
export async function withLoggingAsync<T>(
  { logPrefix, process }: { logPrefix: string; process: string },
  thunk: () => Promise<T>,
): Promise<T> {
  logger.info(`${logPrefix}>>>>>>>>>>>>>>>>>>>>> ${process} start.`);
  const result = await thunk();
  logger.info(`${logPrefix}<<<<<<<<<<<<<<<<<<<<< ${process} end.`);
  return result;
}
