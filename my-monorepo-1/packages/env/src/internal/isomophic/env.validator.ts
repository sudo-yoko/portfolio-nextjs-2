//
// 環境変数バリデーター
//
import { envBooleanString, envProtocolString } from '#env/internal/isomophic/env.types';

export function isEnvSet(value: string | undefined): value is string  {
    //TODO: 改行コードのみの場合もtrueになる。
    return value !== undefined && value.trim().length > 0;
};

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
 * 環境変数の値を検証する。
 *
 * @param value - 環境変数の値
 * @param key - 環境変数名。エラー時のログメッセージに出力する。
 * @returns 検証済みの値。文字列を保証。環境変数が未設定の場合はエラーとする。
 */
export function envValidateStringValue(value: string | undefined, option?: { key?: string }): string {
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
 * 環境変数の値を検証する
 *
 * @param value - 環境変数の値
 * @param key - 環境変数名。エラー時のログメッセージに出力する。
 * @returns 検証済みの値。数値を保証。環境変数が未設定の場合はエラーとする。
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
 * 環境変数の値を検証する
 *
 * @param value - 環境変数の値
 * @param key - 環境変数名。エラー時のログメッセージに出力する。
 * @returns 検証済みの値。真偽値を保証。環境変数が未設定の場合はエラーとする。
 */
export function envValidateBooleanValue(value: string | undefined, option?: { key?: string }): boolean {
    const validated = envValidateStringValue(value, { key: option?.key });
    // ブランクが許容されている場合(バリデーションエラーにならない場合)
    if (validated.trim().length === 0){
        return false;
    }
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
 * 環境変数の値を検証する
 *
 * @param value - 環境変数の値
 * @param key - 環境変数名。エラー時のログメッセージに出力する。
 * @returns 検証済みの値。プロトコル値（http or https）を保証。環境変数が未設定の場合はエラーとする。
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
