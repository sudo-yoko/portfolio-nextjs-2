import 'client-only';

import { actionAdapter } from '@/presentation/_system/logging/internal/logging.adapter.action';
import type { Logger } from '@/presentation/_system/logging/logging.types';

/**
 * クライアントサイド専用ロガー
 */
const logger: Logger = actionAdapter;

export default logger;
