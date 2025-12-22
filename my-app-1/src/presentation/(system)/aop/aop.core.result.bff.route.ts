import 'server-only';

import { resultResponse } from '@/presentation/(system)/result/result.core.factories.s';
import { RESULT } from '@/presentation/(system)/result/result.core.types';

/**
 * 返却値のRESULT型オブジェクトをJSON文字列に変換してレスポンスボディにセットして返す
 */
export function withResultParsing(thunk: () => RESULT): Response {
  const result = thunk();
  return resultResponse(result);
}

/**
 * 返却値のRESULT型オブジェクトをJSON文字列に変換してレスポンスボディにセットして返す
 */
export async function withResultParsingAsync(thunk: () => Promise<RESULT>): Promise<Response> {
  const result = await thunk();
  return resultResponse(result);
}
