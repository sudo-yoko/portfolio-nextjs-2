//
// ZipCloudの生のレスポンスを、アプリケーションで扱いやすい形式に正規化する
//
import { ZipCloudResponseOk, ZipCloudResult } from '@/presentation/backend-lib/zipcloud/zipcloud.types';

// 型の計算結果を強制的に展開（平坦化）して表示させるユーティリティ
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

export function normalize(rawData: RawZipCloudResponseOk): ZipCloudResponseOk {
    // resultsがnullの場合は空文字にする
    const normalized: ZipCloudResponseOk = {
        ...rawData,
        results: rawData.results ?? [],
    };
    return normalized;
}
