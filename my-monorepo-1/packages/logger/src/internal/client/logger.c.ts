import 'client-only';

import { actionAdapter } from '#logger/internal/client/logger.winston.action.adapter';
import type { Logger } from '#logger/internal/isomophic/logger.types';

/**
 * クライアントサイド専用ロガー
 */
const logger: Logger = actionAdapter;

export default logger;
