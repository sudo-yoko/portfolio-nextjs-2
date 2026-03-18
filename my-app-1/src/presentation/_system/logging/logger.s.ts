import 'server-only';

import { winstonLogger } from '@/presentation/_system/logging/internal/logging.adapter.winston';
import type { Logger } from '@/presentation/_system/logging/logging.types';

/**
 * サーバーサイド専用ロガー
 */
const logger: Logger = winstonLogger;

export default logger;
