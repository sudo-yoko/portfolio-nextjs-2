import 'server-only';

import { RESULT } from '@/presentation/(system)/result/result.core.types';

/**
 * 返却値のRESULT型オブジェクトをJSON文字列に変換して返す
 */
export function withResultParsing(thunk: () => RESULT): RESULT {
  return thunk(); // 変換なし
}

/**
 * 返却値のRESULT型オブジェクトをJSON文字列に変換して返す
 */
export async function withResultParsingAsync<T>(thunk: () => Promise<T>): Promise<T> {
  return await thunk(); // 変換なし
}
