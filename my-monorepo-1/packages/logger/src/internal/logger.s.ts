import 'server-only';

import type { ServerLogger } from '#logger/internal/logger.types';
import { winstonAdapter } from '#logger/internal/logger.winston.adapter';

/**
 * サーバーサイド専用ロガー
 */
const logger: ServerLogger = winstonAdapter;

// NOTE: オブジェクトを変更不可にする
export default logger;
// export default Object.freeze(logger);
