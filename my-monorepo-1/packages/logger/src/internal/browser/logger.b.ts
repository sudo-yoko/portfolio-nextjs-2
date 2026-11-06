import 'client-only';

import { loggerActionAdapter } from '#logger/internal/browser/logger.b.action.adapter';
import type { Logger } from '#logger/internal/isomorphic/logger.types';

/**
 * クライアントサイド専用ロガー
 */
const logger: Logger = loggerActionAdapter;

export default logger;
