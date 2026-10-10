import 'client-only';

import { actionAdapter } from './internal/logging.winston.action.adapter';
import type { Logger } from './logging.types';

/**
 * クライアントサイド専用ロガー
 */
const logger: Logger = actionAdapter;

export default logger;
