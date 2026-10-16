//
// 環境変数をバリデーション付きで安全に取得するヘルパー
//
import { env } from '#env/internal/env';
import { isEnumValue } from '#env/internal/env.utils';

/**
 * 環境変数 NODE_ENV 定義
 */
export const NodeEnvNext = { Dev: 'development', Prod: 'production', Test: 'test' } as const;
export type NodeEnvNext = (typeof NodeEnvNext)[keyof typeof NodeEnvNext];

/**
 * 環境変数 NODE_ENV の検証済み値を取得する
 *
 * @returns 検証済みの値。Next.js アプリケーションで設定され得る以下のいずれかを保証
 * - "development"
 * - "production"
 * - "test"
 */
export function envNodeEnvNext() {
    if (isEnumValue(env.node_env, NodeEnvNext)) {
        return env;
    }
    throw Error(`未定義の環境変数値です。process.env.NODE_ENV=[${env}]`);
}

/**
 * 環境変数 NEXT_PUBLIC_FW_DEBUG_LOGGER の検証済み値を取得する
 *
 * @returns 検証済みの値。真偽値を保証。環境変数がない場合はfalse
 */
export function envFwDebugLogger() {
    if (env.next_public_fw_debug_logger === '1') {
        return true;
    }
    return false;
}
