// ロギングAOP部品
import { Logger } from '@/presentation/_system/logging/logging.types';

/**
 * ロギングコンテキスト
 */
export type Ctx = {
    logger: Logger;
    logPrefix: string;
    process: string;
};

/**
 * 引数に渡されたサンクの前後にログ出力を追加して実行する
 */
export function withLogging<T>({ logger, logPrefix, process }: Ctx, thunk: () => T): T {
    logger.info(`${logPrefix}>>>>>>>>>>>>>>>>>>>>> ${process} start.`);
    const result = thunk();
    logger.info(`${logPrefix}<<<<<<<<<<<<<<<<<<<<< ${process} end.`);
    return result;
}

/**
 * 引数に渡されたサンクの前後にログ出力を追加して実行する
 */
export async function withLoggingAsync<T>(
    { logger, logPrefix, process }: Ctx,
    thunk: () => Promise<T>,
): Promise<T> {
    logger.info(`${logPrefix}>>>>>>>>>>>>>>>>>>>>> ${process} start.`);
    const result = await thunk();
    logger.info(`${logPrefix}<<<<<<<<<<<<<<<<<<<<< ${process} end.`);
    return result;
}
