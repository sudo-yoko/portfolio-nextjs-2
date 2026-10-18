import 'client-only';

import type { Logger } from '#logger/internal/logger.types';
import { actionAdapter } from '#logger/internal/logger.winston.action.adapter';

/**
 * クライアントサイド専用ロガー
 */
const logger: Logger = actionAdapter;

export default logger;
