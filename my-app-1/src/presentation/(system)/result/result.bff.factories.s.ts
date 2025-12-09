//
// BFFのRESULT型 生成ファクトリー
//
import 'server-only';

import { BffResult } from '@/presentation/(system)/result/result.bff.types';

export function bffRouteResponse<DATA, FIELD extends string>(result: BffResult<DATA, FIELD>): Response {
  // BFFのAPIルートでは、ステータスコードは必ず200を返す。エラーがあればボディに設定する。
  return new Response(JSON.stringify(result), { status: 200 });
}
