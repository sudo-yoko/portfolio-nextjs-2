import 'client-only';

import { actionLogger } from '@/presentation/_system/logging/internal/logging.adapter.action';
import type { Logger } from '@/presentation/_system/logging/logging.types';

/**
 * クライアントサイド専用ロガー
 */
const logger: Logger = actionLogger;

export default logger;
