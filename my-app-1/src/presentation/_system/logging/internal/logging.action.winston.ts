//
// Server Actions を使ってクライアントからサーバーへログを送信する。
//
'use server';

// TODO: 依存関係の方向がおかしいので再検討
// import logger from '@/presentation/_system/logging/logger.s';
import { winstonLogger } from '@/presentation/_system/logging/internal/logging.adapter.winston';

export async function logInfo(message: string) {
    winstonLogger.info(message);
}

export async function logError(message: string) {
    winstonLogger.error(message);
}

export async function logDebug(message: string) {
    winstonLogger.debug(message);
}
