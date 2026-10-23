/**
 * 環境変数が設定されているかを判定する関数
 */
export type EnvSet = (value: string | undefined) => value is string;

/**
 * undefined 以外を設定済みとする
 */
export const definedOnly: EnvSet = (value): value is string => {
    return value !== undefined;
};

/**
 * undefined と空白文字列以外を設定済みとする
 */
export const definedAndNotBlank: EnvSet = (value): value is string => {
    //TODO: 改行コードのみの場合もtrueになる。
    return value !== undefined && value.trim().length > 0;
};
