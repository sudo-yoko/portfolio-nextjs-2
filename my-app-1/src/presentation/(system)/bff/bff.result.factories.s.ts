import 'server-only';

import { BffResult } from '@/presentation/(system)/bff/bff.result.types';

export function bffRouteResponse<RESULT, REASON>(result: BffResult<RESULT, REASON>): Response {
  // BFFのAPIルートでは、ステータスコードは必ず200を返す。エラーがあればボディに設定する。
  return new Response(JSON.stringify(result), { status: 200 });
}
