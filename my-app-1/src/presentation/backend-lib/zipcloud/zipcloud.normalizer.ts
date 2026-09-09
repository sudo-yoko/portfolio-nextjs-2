//
// ZipCloudの生のレスポンスを、アプリケーションで扱いやすい形式に正規化する
//
import { isError } from '@/presentation/backend-lib/zipcloud/zipcloud.helper';
import {
    ZipCloudResponse,
    ZipCloudResponseError,
    ZipCloudResponseOk,
    ZipCloudResult,
} from '@/presentation/backend-lib/zipcloud/zipcloud.types';

// NOTE: 型の計算結果を強制的に展開（平坦化）して表示させるユーティリティ
// VSCodeに拡張機能もあり
// TODO: 共通化
export type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};

/**
 * ZipCloudの生のレスポンスの型
 * 正常時、該当データ無ければresultsにnullが返る
 */
export type RawZipCloudResponseOk = Prettify<
    Omit<ZipCloudResponseOk, 'results'> & {
        results: null | ZipCloudResult[];
    }
>;

/**
 * 型の変換（構造の正規化）
 */
export function normalizeStructure(rawData: RawZipCloudResponseOk): ZipCloudResponseOk {
    // resultsがnullの場合は空の配列にする
    const normalized: ZipCloudResponseOk = {
        ...rawData,
        results: rawData.results ?? [],
    };
    return normalized;
}

/**
 * 値の正規化
 */
export function normalizeValue(data: ZipCloudResponse): ZipCloudResponse {
    // if (isOk(data)) {
    //     const ok: ZipCloudResponseOk = {
    //         ...data,
    //         results: data.results ?? [],
    //     };
    //     return ok;
    // }
    if (isError(data)) {
        if (data.status !== 400) {
            const normalized: ZipCloudResponseError = {
                ...data,
                message: '取得に失敗しました。',
            };
            return normalized;
        }
    }
    return data;
}
