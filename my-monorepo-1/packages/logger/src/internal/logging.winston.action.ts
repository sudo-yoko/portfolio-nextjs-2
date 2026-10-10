//
// Server Actions を使ってクライアントからサーバーへログを送信する。
//
'use server';

// TODO: 依存関係の方向がおかしいので再検討
// import logger from '@/presentation/_system/logging/logger.s';
import { winstonAdapter } from './logging.winston.adapter';
import { Extras } from '../logging.types';

export async function logInfo(message: string, extras?: Extras) {
    winstonAdapter.info(message, extras);
}

export async function logError(message: string, extras?: Extras) {
    winstonAdapter.error(message, extras);
}

export async function logDebug(message: string, extras?: Extras) {
    winstonAdapter.debug(message, extras);
}
