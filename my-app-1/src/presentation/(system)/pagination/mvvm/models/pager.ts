import 'client-only';

import { isOk } from '@/presentation/(system)/bff/bff.result.helpers';
import { FetchPage } from '@/presentation/(system)/pagination/mvvm/models/pagination.requester';
import { Pager, PagerResult } from '@/presentation/(system)/pagination/mvvm/models/types';
import {
  calcPagination,
  offsetOfLastPage,
  pageToOffset,
  toEffectiveOffsetMin,
} from '@/presentation/(system)/pagination/mvvm/models/utils';

/**
 * ページャ関数を返す
 *
 * @typeParam T - 結果リストの型
 * @typeParam Q - 検索条件の型
 *
 * @param fetchPage - データ取得関数
 * @param params - パラメーター
 * @returns ページャ関数
 */
export function createPager<QUERY, RESULT, REASON>(
  fetchPage: FetchPage<QUERY, RESULT, REASON>,
  params: { initialPage?: number; perPage: number; query: QUERY },
): Pager<RESULT> {
  const { perPage, query } = params;
  const initPage = params.initialPage ?? 1;
  const limit = perPage;
  let { offset } = pageToOffset(perPage, initPage);

  /**
   * データ取得関数を使ってページデータを取得する関数
   */
  const fetchData = async (): Promise<PagerResult<RESULT>> => {
    //
    // 実効オフセットに補正（下限値）
    //
    offset = toEffectiveOffsetMin(offset);
    //
    // データ取得
    //
    let result = await fetchPage(offset, limit, query);
    if (!isOk(result)) {
      throw Error();
    }
    let { total, items } = result.data;
    //
    // データなし
    //
    if (total === 0) {
      const { effectiveOffset, currentPage, totalPages } = calcPagination(offset, limit, total);
      offset = effectiveOffset;
      return { total, offset, items, hasNext: false, hasPrev: false, currentPage, totalPages };
    }
    //
    // 実効オフセットに補正（上限値）して再取得
    //
    if (offset > total) {
      offset = offsetOfLastPage(total, limit); // 最終ページの先頭の1件目
      result = await fetchPage(offset, limit, query);
      if (!isOk(result)) {
        throw Error();
      }
      ({ total, items } = result.data);
    }
    //
    // データを返却
    //
    const hasNext = offset + limit < total;
    const hasPrev = offset > 0;
    const { effectiveOffset, currentPage, totalPages } = calcPagination(offset, limit, total);
    offset = effectiveOffset;
    return { total, offset, items, hasNext, hasPrev, currentPage, totalPages };
  };

  /**
   * ページャ関数
   * 検索条件や表示件数などは関数の中にエンクロージングされる
   */
  const pager: Pager<RESULT> = {
    current() {
      return fetchData();
    },
    next() {
      offset += limit;
      return fetchData();
    },
    prev() {
      offset -= limit;
      return fetchData();
    },
  };

  // ページャ関数を返す
  return pager;
}
