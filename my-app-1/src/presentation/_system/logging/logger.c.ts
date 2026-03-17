import 'client-only';

import { loggerImpl } from '@/presentation/_system/logging/logging.impl.action';
import type { Logger } from '@/presentation/_system/logging/logging.types';

/**
 * クライアントサイド専用ロガー
 */
const logger: Logger = loggerImpl;

export default logger;
