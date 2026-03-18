//
// Server Actions を使ってクライアントからサーバーへログを送信する。
//
'use server';

// TODO: 依存関係の方向がおかしいので再検討
// import logger from '@/presentation/_system/logging/logger.s';
import { loggerImpl as logger } from '@/presentation/_system/logging/internal/logging.impl.winston';

export async function logInfo(message: string) {
    logger.info(message);
}

export async function logError(message: string) {
    logger.error(message);
}

export async function logDebug(message: string) {
    logger.debug(message);
}
