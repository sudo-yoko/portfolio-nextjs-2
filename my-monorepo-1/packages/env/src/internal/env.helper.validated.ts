//
// 環境変数をバリデーション付きで安全に取得するヘルパー
//
import { env } from '#env/internal/env';
import { envBooleanString, NextRuntime, NodeEnv, NodeEnvNext } from '#env/internal/env.types';
import { envValidateBooleanValue, isEnumValue } from '#env/internal/env.validator';

export function envNodeEnv() {
    const value = env.node_env;
    if (isEnumValue(value, NodeEnv)) {
        return value;
    }
    throw Error(`未定義の環境変数値です。process.env.NODE_ENV=[${value}]`);
}

/**
 * 環境変数 NODE_ENV の検証済み値を取得する
 *
 * @returns 検証済みの値。Next.js アプリケーションで設定され得る以下のいずれかを保証
 * - "development"
 * - "production"
 * - "test"
 */
export function envNodeEnvNext() {
    const value = env.node_env;
    if (isEnumValue(value, NodeEnvNext)) {
        return value;
    }
    throw Error(`未定義の環境変数値です。process.env.NODE_ENV=[${value}]`);
}

export function envNextRuntime() {
    const value = env.next_runtime;
    if (isEnumValue(value, NextRuntime)) {
        return value;
    }
    throw Error(`未定義の環境変数値です。process.env.NEXT_RUNTIME=[${value}]`);
}

/**
 * 環境変数 NEXT_PUBLIC_FW_DEBUG_LOGGER の検証済み値を取得する
 *
 * @returns 検証済みの値。真偽値を保証。環境変数がない場合はfalse
 */
export function envNextPublicFwDebugLogger() {
    const value = env.next_public_fw_debug_logger;
    return envValidateBooleanValue(value ?? envBooleanString.False);
    // return envBooleanValue(value);
}
