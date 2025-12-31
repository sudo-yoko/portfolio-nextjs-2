//
// BFFのRESULT型 生成ファクトリー
//
import 'server-only';

import { RESULT } from '@/presentation/(system)/result/result.core.types';

export function _bffResponse(result: RESULT): Response {
  // BFFのAPIルートでは、ステータスコードは必ず200を返す。エラーがあればボディに設定する。
  return new Response(JSON.stringify(result), { status: 200 });
}
