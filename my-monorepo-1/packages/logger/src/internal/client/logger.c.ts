import 'client-only';

import { winstonActionAdapter } from '#logger/internal/client/logger.winston.action.adapter';
import type { Logger } from '#logger/internal/isomorphic/logger.types';

/**
 * クライアントサイド専用ロガー
 */
const logger: Logger = winstonActionAdapter;

export default logger;
