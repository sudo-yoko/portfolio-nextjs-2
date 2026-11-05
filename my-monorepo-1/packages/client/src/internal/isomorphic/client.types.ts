import { JsonObject } from 'type-fest';

import { QueryParams } from '#client/internal/isomorphic/client.params';

/**
 * REST API クライアントのインターフェース型
 */
export type Client = {
    /**
     * リクエストを送信する
     */
    send(req: RequestConfig): Promise<RawResponse>;

    // TODO: AbortControllerを使ったリクエストキャンセルの機能
};

export type BffClient = {
    send(req: BffRequestConfig): Promise<RawResponse>;
};

/**
 * HTTP メソッド定義
 */
export const Method = {
    GET: 'GET',
    POST: 'POST',
} as const;
export type Method = (typeof Method)[keyof typeof Method];

/**
 * リクエスト設定オブジェクト
 */
export type RequestConfig = {
    method: Method;
    url: string;
    bodyJson?: JsonObject;
    bodyUrlEncoded?: URLSearchParams;
    query?: QueryParams;
    headers?: Headers;
    timeout?: number;
    /**
     * どのステータスをエラーとするか指定可能
     */
    validateStatus?: ValidateStatus;
};

export type BffRequestConfig = {
    url: string;
    data?: JsonObject;
};

export type Headers = Record<string, string>;
// export type HeadersInit = Headers | string[][] | Record<string, string>; // NOTE:

/**
 * HTTPステータスの検証関数。
 * 正常な応答とみなすステータスコードを判定する
 */
export type ValidateStatus = (status: number) => boolean;

/**
 * 返却オブジェクト
 */
// TODO: RESULT型と型名が似ているため、ClientResult、RawResponseなどにする
export type RawResponse = {
    status: number;
    /**
     * BFFのリクエストの場合は、RESULT型の値が格納される。
     * BEのリクエストの場合は、結果のレスポンスボディが格納される。
     */
    rawBody: string; // TODO: 名前をdataにするか
};

/**
 * 送信用クエリパラメーター型
 */
// export type QueryParam<K extends string> = Partial<Record<K, string | string[]>>;
// export type QueryParam = { key: string; value: string }[];
