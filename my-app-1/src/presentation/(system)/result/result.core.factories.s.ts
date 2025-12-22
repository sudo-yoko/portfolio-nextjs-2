//
// RESULT型 生成ファクトリー
//
import 'server-only';

import { RESULT } from '@/presentation/(system)/result/result.core.types';

export function resultResponse(result: RESULT): Response {
  // BFFのAPIルートでは、ステータスコードは必ず200を返す。エラーがあればボディに設定する。
  return new Response(JSON.stringify(result), { status: 200 });
}
