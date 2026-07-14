/**
 * URLクエリ文字列の型定義
 */
export type SearchParam = string | string[] | undefined;

/**
 * URLクエリ文字列の集合を扱うオブジェクトの型定義
 */
export type SearchParams = Promise<Record<string, SearchParam>>;

export async function getStringParam(searchParams: SearchParams | undefined, key: string): Promise<string> {
    const params = await searchParams;
    const param = params?.[key];
    const value = Array.isArray(param) ? param[0] : param;
    return value ? value.trim() : '';
    // if (!searchParams) {
    //     return '';
    // }
    // NOTE: 空文字もFalsyとなる
    // if (!param) {
    //     return '';
    // }
    // if (Array.isArray(param)) {
    //     return param[0];
    // }
    // return param.trim();
}
