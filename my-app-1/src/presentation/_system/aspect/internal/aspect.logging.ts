// 共通の前後処理（AOP）：ロギング
// ロギングAOP部品
// ロギングラッパー
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
export function withLogging<T>({ logger, logPrefix, process }: Ctx, subject: () => T) {
    logger.info(`${logPrefix}>>>>>>>>>>>>>>>>>>>>> ${process} start.`);
    try {
        return subject();
    } finally {
        logger.info(`${logPrefix}<<<<<<<<<<<<<<<<<<<<< ${process} end.`);
    }
}

/**
 * 引数に渡されたサンクの前後にログ出力を追加して実行する
 */
export async function withLoggingAsync<T>({ logger, logPrefix, process }: Ctx, subject: () => Promise<T>) {
    logger.info(`${logPrefix}>>>>>>>>>>>>>>>>>>>>> ${process} start.`);
    try {
        return await subject();
    } finally {
        logger.info(`${logPrefix}<<<<<<<<<<<<<<<<<<<<< ${process} end.`);
    }
}
