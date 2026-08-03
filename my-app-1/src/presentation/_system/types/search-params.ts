//
// URLクエリ文字列
// JavaScriptのURLSearchParams用
//

// TODO: SearchParam利用箇所をこのモジュールに移行
/**
 * 送信用クエリパラメーター型
 */
export type QueryParam = { key: string; value: string }[];

export function queryParam(params: Record<string, string | string[]>): QueryParam {
    // TODO: mapとflatMapの違い
    return Object.entries(params).flatMap(([key, value]) => {
        if (Array.isArray(value)) {
            return value.map((v) => ({ key, value: v }));
        } else {
            return { key, value };
        }
    });
}

export function getURLSearchParams(queryParam: QueryParam): URLSearchParams {
    const searchParams = new URLSearchParams();
    queryParam.forEach(({ key, value }) => searchParams.append(key, value));
    return searchParams;
}

// export function getQueryString(queryParam: QueryParam): string {
//     const urlSearchParams = getURLSearchParams(queryParam);
//     return urlSearchParams.toString();
// }

export function getQueryString(params: Record<string, string | string[]>): string {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
        if (Array.isArray(value)) {
            value.forEach((v) => searchParams.append(key, v));
        } else {
            searchParams.set(key, value);
        }
    }
    return searchParams.toString();

    // const query = queryParam(record);
    // const searchParams = getURLSearchParams(query);
    // return searchParams.toString();
}

// export function getQueryString(record: Record<string, string>): string {
//     return new URLSearchParams(record).toString();
// }
