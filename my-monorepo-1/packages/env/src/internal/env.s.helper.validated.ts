//
// 環境変数をバリデーション付きで安全に取得するヘルパー。（サーバーサイド専用）
//
import 'server-only';

import { env } from '#env/internal/env.s';
import {
    envRequiredNumValue,
    envRequiredProtocolValue,
    envRequiredStringValue,
} from '#env/internal/env.utils';

/**
 * 環境変数の検証済みの値を取得する
 *
 * @param key - 環境変数名
 * @returns 検証済みの値。文字列を保証
 */
export function envString(key: string): string {
    const value = env.get(key);
    return envRequiredStringValue(value, key);
}

/**
 * 環境変数の検証済みの値を取得する
 *
 * @param key - 環境変数名
 * @returns 検証済みの値。数値を保証
 */
export function envNumber(key: string): number {
    const value = envString(key);
    return envRequiredNumValue(value, key);
}

/**
 * 環境変数の検証済みの値を取得する
 *
 * @param key - 環境変数名
 * @returns 検証済みの値。プロトコル（http or https）を保証
 */
export function envProtocol(key: string) {
    const value = envString(key);
    return envRequiredProtocolValue(value);
}
