import 'client-only';

import { BffResult } from '@/presentation/(system)/bff/bff.result.types';

/**
 * データ取得関数の関数シグネチャ
 *
 * @typeParam TItems - 返却データの型（ページのデータ）
 * @typeParam TQuery - 検索条件を格納するオブジェクトの型
 * @returns
 * BoundaryResult型。正常時の返却データがFetchPageResult<TItems>型、Rejectなし。
 */
export interface FetchPage<QUERY, RESULT, REASON> {
  (offset: number, limit: number, query: QUERY): Promise<BffResult<FetchPageResult<RESULT>, REASON>>;
}

/**
 * データ取得関数の戻り値の型
 */
export interface FetchPageResult<RESULT> {
  total: number;
  items: RESULT;
}
