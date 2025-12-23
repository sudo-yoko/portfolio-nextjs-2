import 'client-only';

import { bffError } from '@/presentation/(system)/error/error.factories';
import {
    calcPagination,
    offsetOfLastPage,
    pageToOffset,
    toEffectiveOffsetMin,
} from '@/presentation/(system)/pagination/mvvm/models/pagination.helpers';
import { FetchPage } from '@/presentation/(system)/pagination/mvvm/models/pagination.requester';
import { PageData, Pager } from '@/presentation/(system)/pagination/mvvm/models/pagination.types.c';
import { invalid, okData } from '@/presentation/(system)/result/result.core.factories';
import { isAborted, isInvalid } from '@/presentation/(system)/result/result.core.helpers';
import { PaginationResult } from '@/presentation/(system)/pagination/mvvm/models/pagination.types';
import { FormData } from '@/presentation/(system)/validation/validation.types';

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
export function createPager<ITEMS, FIELD extends string>(
    fetchPage: FetchPage<ITEMS, FIELD>,
    params: { initialPage?: number; perPage: number; query: FormData<FIELD> },
): Pager<ITEMS, FIELD> {
    const { perPage, query } = params;
    const initPage = params.initialPage ?? 1;
    const limit = perPage;
    let { offset } = pageToOffset(perPage, initPage);

    /**
     * データ取得関数を使ってページデータを取得する関数
     */
    const fetchData = async (): Promise<PaginationResult<PageData<ITEMS>, FIELD>> => {
        //
        // 実効オフセットに補正（下限値）
        //
        offset = toEffectiveOffsetMin(offset);
        //
        // データ取得
        //
        let result = await fetchPage(offset, limit, query);
        // BffResult -> PagerResultに変換して返す
        if (isAborted(result)) {
            throw bffError(result);
        }
        if (isInvalid(result)) {
            return invalid(result.violations);
        }
        let { total, items } = result.data;
        //
        // データなし
        //
        if (total === 0) {
            const { effectiveOffset, currentPage, totalPages } = calcPagination(offset, limit, total);
            offset = effectiveOffset;

            // return { total, offset, items, hasNext: false, hasPrev: false, currentPage, totalPages };
            const data: PageData<ITEMS> = {
                total,
                offset,
                items,
                hasNext: false,
                hasPrev: false,
                currentPage,
                totalPages,
            };
            return okData(data);
            // const result: PagerResult<ITEMS, FIELD> = { tag: 'ok', data };
            // return result;
        }
        //
        // 実効オフセットに補正（上限値）して再取得
        //
        if (offset > total) {
            offset = offsetOfLastPage(total, limit); // 最終ページの先頭の1件目
            result = await fetchPage(offset, limit, query);
            if (isAborted(result)) {
                throw bffError(result);
            }
            if (isInvalid(result)) {
                return invalid(result.violations);
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
        // return { tag: 'ok', total, offset, items, hasNext, hasPrev, currentPage, totalPages };
        const data: PageData<ITEMS> = { total, offset, items, hasNext, hasPrev, currentPage, totalPages };
        return okData(data);
        // const result2: PagerResult<ITEMS, FIELD> = { tag: 'ok', data };
        // return result2;
    };

    /**
     * ページャ関数
     * 検索条件や表示件数などは関数の中にエンクロージングされる
     */
    const pager: Pager<ITEMS, FIELD> = {
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
