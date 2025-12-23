//
// ページネーションの型定義
//
import 'client-only';

import { PaginationResult } from '@/presentation/(system)/pagination/min/modules/pagination.types';

/**
 * ページャ関数のインターフェース型
 */
export type Pager<ITEMS, FIELD extends string> = {
    /**
     * 現在のページを取得する
     */
    current(): Promise<PaginationResult<PageData<ITEMS>, FIELD>>;
    /**
     * 次ページを取得する
     */
    next(): Promise<PaginationResult<PageData<ITEMS>, FIELD>>;
    /**
     * 前ページを取得する
     */
    prev(): Promise<PaginationResult<PageData<ITEMS>, FIELD>>;
};

/**
 * ページャ関数の戻り値の型
 */
// export type PagerResult<ITEMS, FIELD extends string> = OkData<PageData<ITEMS>> | Invalid<FIELD>;

/**
 * ページのデータ型
 */
// export interface Pager<T> {
export type PageData<ITEMS> = {
    items: ITEMS;
    /**
     * 現在選択されているページ
     */
    currentPage: number;
    /**
     * 総件数
     */
    total: number;
    /**
     * 総ページ数
     */
    totalPages: number;
    /**
     * 実効オフセット（補正あり）
     */
    offset: number;
    /**
     * 次ページがあるか
     */
    hasNext: boolean;
    /**
     * 前ページがあるか
     */
    hasPrev: boolean;
};
