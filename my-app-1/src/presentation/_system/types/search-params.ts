//
// URLクエリ文字列を作成する
//
// TODO: SearchParam利用箇所をこのモジュールに移行

/** 入力となるフォームオブジェクトの型 */
// TODO: validationのFormDataでは配列に未対応
export type MultiValuedMap = Record<string, string | string[]>;

/** クエリパラメータの配列 */
export type QueryParam = { key: string; value: string };

/** クエリパラメータの配列 */
export type QueryParams = QueryParam[];

/**
 *
 */
export function toQueryParams(map: MultiValuedMap): QueryParams {
    // TODO: mapとflatMapの違い
    return Object.entries(map).flatMap(([key, value]) => {
        if (Array.isArray(value)) {
            return value.map((v) => ({ key, value: v }));
        } else {
            return { key, value };
        }
    });
}

/**
 *
 */
export function toURLSearchParams(params: QueryParams): URLSearchParams {
    const searchParams = new URLSearchParams();
    params.forEach(({ key, value }) => searchParams.append(key, value));
    return searchParams;
}

/**
 *
 */
export function toQueryString(map: MultiValuedMap): string {
    return toURLSearchParams(toQueryParams(map)).toString();
}

/**
 *
 */
export function toMultiValuedMap(params: URLSearchParams): MultiValuedMap {
    const map: MultiValuedMap = {};
    for (const [key, value] of params) {
        if (key in map) {
            const current = map[key];
            if (Array.isArray(current)) {
                current.push(value);
            } else {
                map[key] = [current, value];
            }
        } else {
            map[key] = value;
        }
    }
    return map;
}

// export function getQueryString(queryParam: QueryParam): string {
//     const urlSearchParams = getURLSearchParams(queryParam);
//     return urlSearchParams.toString();
// }

// export function toQueryString(form: Form): string {
// const searchParams = new URLSearchParams();
// for (const [key, value] of Object.entries(form)) {
//     if (Array.isArray(value)) {
//         value.forEach((v) => searchParams.append(key, v));
//     } else {
//         searchParams.set(key, value);
//     }
// }
// return searchParams.toString();

// const query = queryParam(record);
// const searchParams = getURLSearchParams(query);
// return searchParams.toString();
// }

// export function getQueryString(record: Record<string, string>): string {
//     return new URLSearchParams(record).toString();
// }
