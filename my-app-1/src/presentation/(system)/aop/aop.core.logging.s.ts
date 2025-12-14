// ロギングAOP部品
import 'server-only';

import logger from '@/presentation/(system)/logging/logger.s';

/**
 * 引数
 */
export type Props = {
  logPrefix: string;
  process: string;
};

/**
 * 引数に渡されたサンクの前後にログ出力を追加して実行する
 */
export function withLogging<T>({ logPrefix, process }: Props, thunk: () => T): T {
  logger.info(`${logPrefix}>>>>>>>>>>>>>>>>>>>>> ${process} start.`);
  const result = thunk();
  logger.info(`${logPrefix}<<<<<<<<<<<<<<<<<<<<< ${process} end.`);
  return result;
}

/**
 * 引数に渡されたサンクの前後にログ出力を追加して実行する
 */
export async function withLoggingAsync<T>(
  { logPrefix, process }: Props,
  thunk: () => Promise<T>,
): Promise<T> {
  logger.info(`${logPrefix}>>>>>>>>>>>>>>>>>>>>> ${process} start.`);
  const result = await thunk();
  logger.info(`${logPrefix}<<<<<<<<<<<<<<<<<<<<< ${process} end.`);
  return result;
}
