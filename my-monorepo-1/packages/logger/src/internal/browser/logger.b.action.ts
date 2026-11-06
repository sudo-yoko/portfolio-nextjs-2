//
// Server Actions を使ってクライアントからサーバーへログを送信する。
//
'use server';

import { Extras } from '#logger/internal/isomorphic/logger.types';
import logger from '#logger/internal/server/logger.s';

export async function logInfo(message: string, extras?: Extras) {
    logger.info(message, extras);
}

export async function logError(message: string, extras?: Extras) {
    logger.error(message, extras);
}

export async function logDebug(message: string, extras?: Extras) {
    logger.debug(message, extras);
}
