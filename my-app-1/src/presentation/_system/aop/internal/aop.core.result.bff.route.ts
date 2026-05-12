import 'server-only';

import { RESULT } from '@/presentation/_system/result/result.types';

/**
 * 返却値のRESULT型オブジェクトをJSON文字列に変換してレスポンスボディにセットして返す
 */
export async function withResponseAsync(thunk: () => Promise<RESULT>): Promise<Response> {
    const result = await thunk();
    // BFFのAPIルートでは、ステータスコードは必ず200を返す。エラーがあればボディに設定する。
    return new Response(JSON.stringify(result), { status: 200 });
}
