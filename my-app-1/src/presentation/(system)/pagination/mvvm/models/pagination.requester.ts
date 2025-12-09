//
// ページネーション バックエンドの呼び出し
//
import 'client-only';

import { BffResult } from '@/presentation/(system)/result/result.bff.types';
import { FormData } from '@/presentation/(system)/validation/validation.types';

/**
 * データ取得のインターフェース型
 *
 * @typeParam TItems - 返却データの型（ページのデータ）
 * @typeParam TQuery - 検索条件を格納するオブジェクトの型
 * @returns
 * BoundaryResult型。正常時の返却データがFetchPageResult<TItems>型、Rejectなし。
 */
export interface FetchPage<ITEMS, FIELD extends string> {
  (offset: number, limit: number, query: FormData<FIELD>): Promise<BffResult<FetchPageResult<ITEMS>, FIELD>>;
}

/**
 * データ取得の戻り値の型
 */
export interface FetchPageResult<ITEMS> {
  total: number;
  items: ITEMS;
}
