import 'server-only';

import { formatError } from '@my/error';
import logger from '@my/logger/server';
import { RESULT } from '@my/result';

const logPrefix = 'aspect.result.route.ts: ';

/**
 * 返却値のRESULT型オブジェクトをJSON文字列に変換してレスポンスボディにセットして返す
 */
export function withResponseAsync(thunk: () => Promise<RESULT>): () => Promise<Response> {
    return async () => {
        try {
            const result = await thunk();
            // BFFのAPIルートでは、ステータスコードは必ず200を返す。エラーがあればボディに設定する。
            return Response.json(result, { status: 200 });
        } catch (error) {
            // RESULTのJSON変換に失敗した場合など
            const { all, message } = formatError({ error });
            logger.error(logPrefix + all);
            return new Response(message, { status: 500 });
        }
    };
}
