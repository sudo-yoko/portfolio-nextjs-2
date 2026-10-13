import 'client-only';

import type { Logger } from '#logger/internal/logging.types';
import { actionAdapter } from '#logger/internal/logging.winston.action.adapter';

/**
 * クライアントサイド専用ロガー
 */
const logger: Logger = actionAdapter;

export default logger;
