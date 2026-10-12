//
// 環境変数ユーティリティ
//

/**
 * 環境変数の検証済みの値を取得する
 *
 * @param value - 環境変数の値を設定する
 * @param key - 環境変数名を設定する
 * @returns 検証済みの値。文字列を保証
 */
export function envRequiredStringValue(value: string | undefined, key: string): string {
    if (!value || value.length === 0) {
        const message = `環境変数が設定されていません。key=[${key}], value=[${value}]`;
        throw new Error(message);
    }
    return value;
}

/**
 * 環境変数の検証済みの値を取得する
 *
 * @param value - 環境変数の値を設定する
 * @param key - 環境変数名を設定する
 * @returns 検証済みの値。数値を保証
 */
export function envRequiredNumValue(value: string, key: string): number {
    const num = Number(value);
    if (value.trim() === '' || isNaN(num)) {
        const message = `環境変数が数字ではありません。key=[${key}], value=[${value}]`;
        throw new Error(message);
    }
    return num;
}

/**
 *
 * @param value - 判定する値
 * @param enumObj - 文字列のキーと値を持つオブジェクト
 * @returns
 */
export function isEnumValue<T extends Record<string, string>>(
    value: string | undefined,
    enumObj: T,
): value is T[keyof T] {
    if (value !== undefined) {
        return (Object.values(enumObj) as string[]).includes(value);
    }
    return false;
}

/**
 * 環境変数 プロトコル値の定義
 */
export const Protocol = { Http: 'http', Https: 'https' } as const;
export type Protocol = (typeof Protocol)[keyof typeof Protocol];

/**
 * 環境変数の検証済みの値を取得する
 *
 * @param value - 環境変数の値を設定する
 * @returns 検証済みの値。プロトコル（http or https）を保証
 */
export function envRequiredProtocolValue(value: string) {
    const v = value.trim();
    if (isEnumValue(v, Protocol)) {
        return v;
    }
    const message = `不正なプロトコルです。[${value}]`;
    throw new Error(message);
}
