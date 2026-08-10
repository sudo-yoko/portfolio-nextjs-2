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
export type ZipCloudResponseStatus = {
    status: number;
};
export type ZipCloudResponseOk = ZipCloudResponseStatus & {
    status: 200;
    results: null | ZipCloudResult[];
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
export type ZipCloudResponseError = ZipCloudResponseStatus & {
    status: 400 | 500;
    message: string;
};
export type ZipCloudResponse = ZipCloudResponseOk | ZipCloudResponseError;
