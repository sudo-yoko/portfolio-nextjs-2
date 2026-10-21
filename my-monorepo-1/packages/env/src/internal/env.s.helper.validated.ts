//
// 環境変数をバリデーション付きで安全に取得するヘルパー。（サーバーサイド専用）
//
import 'server-only';

import { env_s } from '#env/internal/env.s';
import { envValueOrDefault } from '#env/internal/env.strategy';
import { envBooleanString } from '#env/internal/env.types';
import {
    envValidateBooleanValue,
    envValidateNumValue,
    envValidateProtocolValue,
    envValidateStringValue,
} from '#env/internal/env.validator';

/**
 * 環境変数 process.env.ENABLE_LOGGER_INITIALIZATION の検証済みの値を取得する
 *
 * @returns 検証済みの値。真偽値を保証。環境変数がない場合はfalse
 */
export function envEnableLoggerInitialization() {
    const value = env_s.enable_logger_initialization;
    return envValidateBooleanValue(envValueOrDefault(value, envBooleanString.False));
}

/**
 * 環境変数の検証済みの値を取得する
 *
 * @param key - 環境変数名
 * @returns 検証済みの値。文字列を保証。ただし空文字はエラーとする。
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
    return envValueOrDefault(value, defaultValue);
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
    return envValidateNumValue(envValueOrDefault(value, String(defaultValue)), { key });
}

/**
 * 環境変数の検証済みの値を取得する
 *
 * @param key - 環境変数名
 * @returns 検証済みの値。プロトコル（http or https）を保証
 */
export function envProtocol(key: string) {
    const value = envString(key);
    return envValidateProtocolValue(value);
}
