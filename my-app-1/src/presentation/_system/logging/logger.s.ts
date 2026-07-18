import 'server-only';

import { winstonAdapter } from '@/presentation/_system/logging/internal/logging.winston.adapter';
import type { Logger } from '@/presentation/_system/logging/logging.types';

/**
 * サーバーサイド専用ロガー
 */
const logger: Logger = winstonAdapter;

// NOTE: オブジェクトを変更不可にする
export default logger;
// export default Object.freeze(logger);
