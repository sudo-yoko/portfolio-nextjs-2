import 'server-only';

import { loggerImpl } from '@/presentation/_system/logging/logging.impl.winston';
import type { Logger } from '@/presentation/_system/logging/logging.types';

/**
 * サーバーサイド専用ロガー
 */
const logger: Logger = loggerImpl;

export default logger;
