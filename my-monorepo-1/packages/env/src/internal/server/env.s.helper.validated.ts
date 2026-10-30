//
// 環境変数をバリデーション付きで安全に取得するヘルパー。（サーバーサイド専用）
//
import 'server-only';

import {
    envStringValueOrDefault,
    envValidateBooleanValueOrDefault,
    envValidateNumValueOrDefault,
} from '#env/internal/isomophic/env.helper.default';
import {
    envValidateNumValue,
    envValidateProtocolValue,
    envValidateStringValue,
} from '#env/internal/isomophic/env.validator';
import { env_s } from '#env/internal/server/env.s';

/**
 * 環境変数 process.env.ENABLE_LOGGER_INITIALIZATION の検証済みの値を取得する
 *
 * @returns 検証済みの値。真偽値を保証。環境変数がない場合はfalse
 */
export function envEnableLoggerInitialization() {
    const value = env_s.enable_logger_initialization;
    return envValidateBooleanValueOrDefault(value, false);
}

/**
 * 環境変数の検証済みの値を取得する
 *
 * @param key - 環境変数名
 * @returns 検証済みの値。文字列を保証。環境変数が未設定の場合はエラーとする。
 */
export function envString(key: string): string {
    const value = env_s.get(key);
    return envValidateStringValue(value, { key });
}

/**
 *
 * @param key - 環境変数名
 * @param defaultValue - 環境変数が未設定の場合に返す値。空文字も可能
 * @returns
 */
export function envStringOrDefault(key: string, defaultValue: string): string {
    const value = env_s.get(key);
    return envStringValueOrDefault(value, defaultValue);
}

/**
 * 環境変数の検証済みの値を取得する
 *
 * @param key - 環境変数名
 * @returns 検証済みの値。数値を保証
 */
export function envNumber(key: string): number {
    const value = envString(key);
    return envValidateNumValue(value, { key });
}

export function envNumberOrDefault(key: string, defaultValue: number): number {
    const value = env_s.get(key);
    return envValidateNumValueOrDefault(value, defaultValue, { key });
}

/**
 * 環境変数の検証済みの値を取得する
 *
 * @param key - 環境変数名
 * @returns 検証済みの値。プロトコル（http or https）を保証
 */
export function envProtocol(key: string) {
    const value = envString(key);
    return envValidateProtocolValue(value, { key });
}

export function envProxySettings(): { protocol: string; host: string; port: number } {
    const protocol = envProtocol('PROXY_PROTOCOL');
    const host = envString('PROXY_HOST');
    const port = envNumber('PROXY_PORT');
    return { protocol, host, port };
}
