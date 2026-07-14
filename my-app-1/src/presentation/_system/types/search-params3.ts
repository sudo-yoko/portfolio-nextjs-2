/**
 * URLクエリ文字列の型定義
 */
export type SearchParam = string | string[] | undefined;

/**
 * URLクエリ文字列の集合を扱うオブジェクトの型定義
 */
export type SearchParams = Promise<Record<string, SearchParam>>;

export async function getStringParam(searchParams: SearchParams | undefined, key: string): Promise<string> {
    if (!searchParams) {
        return '';
    }
    const params = await searchParams;
    const value = params[key];
    if (!value) {
        return '';
    }
    if (Array.isArray(value)) {
        return value[0];
    }
    return value;
}
