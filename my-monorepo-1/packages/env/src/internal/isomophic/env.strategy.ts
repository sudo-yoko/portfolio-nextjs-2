/**
 * 環境変数が設定されているかを判定する関数
 */
type EnvSet = (value: string | undefined) => value is string;

/**
 * undefined 以外を設定済みとする
 */
const _definedOnly: EnvSet = (value): value is string => {
    return value !== undefined;
};

/**
 * undefined と空白文字列以外を設定済みとする
 */
const definedAndNotBlank: EnvSet = (value): value is string => {
    //TODO: 改行コードのみの場合もtrueになる。
    return value !== undefined && value.trim().length > 0;
};

/**
 * 環境変数が設定されているかを判定する関数
 */
export const isEnvSet: EnvSet = definedAndNotBlank;
