//
// リクエスト型
//
export type ZipCloudRequest = {
    zipcode: string;
    // callback: string; // TODO: JSONP
    limit?: string;
};

//
// レスポンス型
//
/**
 * zipCloudのレスポンス。該当データなしの場合にresultsがnullになる。
 */
// export type RawZipCloudResponseOk = ZipCloudResponseStatus & {
//     status: 200;
//     results: null | ZipCloudResult[];
// };

/**
 * zipCloudのレスポンスをresultsがnullを無くして、空の配列とする型。アプリケーションで扱いやすい型にしたもの
 * 型を上書き（オーバーライド）
 */
// export type ZipCloudResponseOk = Prettify<
//     Omit<RawZipCloudResponseOk, 'results'> & {
//         results: NonNullable<RawZipCloudResponseOk['results']>;
//     }
// >;

// // 型の計算結果を強制的に展開（平坦化）して表示させるユーティリティ
// export type Prettify<T> = {
//     [K in keyof T]: T[K];
// } & {};

export type ZipCloudResponseStatus = {
    status: number;
};
export type ZipCloudResponseOk = ZipCloudResponseStatus & {
    status: 200;
    results: ZipCloudResult[];
};
export type ZipCloudResponseError = ZipCloudResponseStatus & {
    status: 400 | 500;
    message: string;
};
export type ZipCloudResult = {
    zipcode: string;
    prefcode: string;
    address1: string;
    address2: string;
    address3: string;
    kana1: string;
    kana2: string;
    kana3: string;
};

export type ZipCloudResponse = ZipCloudResponseOk | ZipCloudResponseError;
