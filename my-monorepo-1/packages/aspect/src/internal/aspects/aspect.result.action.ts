import 'server-only';

import { RESULT } from '@my/result';

/**
 * 返却値のRESULT型オブジェクトをJSON文字列に変換して返す
 */
export function withResultParsing(thunk: () => RESULT): () => RESULT {
    return () => {
        return thunk(); // 変換なし
    };
}

/**
 * 返却値のRESULT型オブジェクトをJSON文字列に変換して返す
 */
export function withResultParsingAsync(thunk: () => Promise<RESULT>): () => Promise<RESULT> {
    return async () => {
        return await thunk(); // 変換なし
    };
}
