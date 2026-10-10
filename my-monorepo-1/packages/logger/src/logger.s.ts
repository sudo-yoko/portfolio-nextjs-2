import 'server-only';

import { winstonAdapter } from './internal/logging.winston.adapter';
import type { Logger } from './logging.types';

/**
 * サーバーサイド専用ロガー
 */
const logger: Logger = winstonAdapter;

// NOTE: オブジェクトを変更不可にする
export default logger;
// export default Object.freeze(logger);
