//
// ページネーション バックエンドの呼び出し
//
import 'client-only';

import { PaginationResult } from '@/presentation/_system/pagination/mvvm/models/pagination.types';
import { FormData } from '@/presentation/_system/validation/validation.types';

/**
 * データ取得のインターフェース型
 */
export interface FetchPage<ITEMS, FIELD extends string> {
    (
        offset: number,
        limit: number,
        // TODO: 検索条件がFormDataなのでフォーム以外のオプションの条件を入れられない
        formData: FormData<FIELD>,
    ): Promise<PaginationResult<FetchData<ITEMS>, FIELD>>;
}

/**
 * データ取得の戻り値の型
 */
export interface FetchData<ITEMS> {
    total: number;
    items: ITEMS;
}
