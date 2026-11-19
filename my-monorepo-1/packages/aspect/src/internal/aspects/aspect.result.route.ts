import 'server-only';

import { RESULT } from '@my/result';

/**
 * 返却値のRESULT型オブジェクトをJSON文字列に変換してレスポンスボディにセットして返す
 */
export function withResponseAsync(thunk: () => Promise<RESULT>): () => Promise<Response> {
    return async () => {
        const result = await thunk();
        // BFFのAPIルートでは、ステータスコードは必ず200を返す。エラーがあればボディに設定する。
        return Response.json(result, { status: 200 });
    };
}
