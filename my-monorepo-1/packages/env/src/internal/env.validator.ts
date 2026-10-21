//
// 環境変数バリデーター
//
import { isEnvSet } from '#env/internal/env.strategy';
import { envBooleanString, envProtocolString } from '#env/internal/env.types';

/**
 *
 * @param value - 判定する値
 * @param enumObj - 文字列のキーと値を持つオブジェクト
 * @returns
 */
export function isEnumValue<T extends Record<string, string | undefined>>(
    value: string | undefined,
    enumObj: T,
): value is T[keyof T] {
    const values = Object.values(enumObj);
    return values.includes(value);
}

/**
 * 環境変数の検証済みの値を返す。
 *
 * @param value - 環境変数の値を設定する
 * @param key - 環境変数名を設定する。エラー時のログメッセージに出力する。
 * @returns 検証済みの値。文字列を保証。ただし空白文字列はエラーとする。
 */
export function envValidateStringValue(value: string | undefined, option?: { key?: string }): string {
    // if (!value || value.length === 0 || value.trim().length === 0) {
    if (isEnvSet(value)) {
        return value;
    }
    let message = `環境変数が設定されていません。value=[${value}]`;
    if (option?.key !== undefined) {
        message += `, key=[${option.key}]`;
    }
    throw new Error(message);
}

/**
 * 環境変数の検証済みの値を返す。
 *
 * @param value - 環境変数の値を設定する
 * @param key - 環境変数名を設定する。エラー時のログメッセージに出力する。
 * @returns 検証済みの値。数値を保証。環境変数の値が空白文字列ならエラーとする。
 */
export function envValidateNumValue(value: string | undefined, option?: { key?: string }): number {
    const validated = envValidateStringValue(value, { key: option?.key });
    const num = Number(validated);
    if (isNaN(num)) {
        let message = `環境変数が数値ではありません。value=[${value}]`;
        if (option?.key !== undefined) {
            message += `, key=[${option.key}]`;
        }
        throw new Error(message);
    }
    return num;
}

/**
 * 環境変数の検証済みの値を返す。
 *
 * @param value - 環境変数の値を設定する
 * @param key - 環境変数名を設定する。エラー時のログメッセージに出力する。
 * @returns 検証済みの値。真偽値を保証。環境変数の値が空白文字列ならエラーとする。
 */
export function envValidateBooleanValue(value: string | undefined, option?: { key?: string }): boolean {
    const validated = envValidateStringValue(value, { key: option?.key });
    if (isEnumValue(validated, envBooleanString)) {
        if (validated === envBooleanString.True) {
            return true;
        }
        return false;
    }
    let message = `真偽値は 1 または 0 を設定してください。value=[${value}]`;
    if (option?.key !== undefined) {
        message += `, key=[${option.key}]`;
    }
    throw Error(message);
}

/**
 * 環境変数の検証済みの値を返す。
 *
 * @param value - 環境変数の値を設定する
 * @param key - 環境変数名を設定する。エラー時のログメッセージに出力する。
 * @returns 検証済みの値。プロトコル値（http or https）を保証。環境変数の値が空白文字列ならエラーとする。
 */
export function envValidateProtocolValue(value: string | undefined, option?: { key?: string }) {
    const validated = envValidateStringValue(value, { key: option?.key });
    const v = validated.trim();
    if (isEnumValue(v, envProtocolString)) {
        return v;
    }
    let message = `不正なプロトコルです。value=[${value}]`;
    if (option?.key !== undefined) {
        message += `, key=[${option.key}]`;
    }
    throw new Error(message);
}
