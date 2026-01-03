//
// カスタムフック＆関連するイベントハンドラー
//
import 'client-only';

import { execute, executeAsync } from '@/presentation/(system)/aop/aop.feature.client';
import { createPager } from '@/presentation/(system)/pagination/mvvm/models/pagination.pager';
import { FetchPage } from '@/presentation/(system)/pagination/mvvm/models/pagination.requester';
import { Pager } from '@/presentation/(system)/pagination/mvvm/models/pagination.types.c';
import {
    Action,
    reducer,
    Step,
    toInvalid,
    toOk,
} from '@/presentation/(system)/pagination/mvvm/view-models/pagination.reducer';
import { isInvalid, isOkData } from '@/presentation/(system)/result/result.core.helpers';
import { FormData, Violations } from '@/presentation/(system)/validation/validation.types';
import React, { useEffect, useReducer, useRef, useState } from 'react';

/**
 * 検索 カスタムフック
 */
export function usePagination<ITEMS, FIELD extends string>({
    search,
    fetchCallback,
    initialPage,
    perPage,
    query,
    setItems,
    setViolations,
}: {
    search: boolean;
    fetchCallback: FetchPage<ITEMS, FIELD>;
    initialPage: number;
    perPage: number;
    query: FormData<FIELD>;
    setItems: React.Dispatch<React.SetStateAction<ITEMS>>;
    setViolations: React.Dispatch<React.SetStateAction<Violations<FIELD>>>;
}) {
    const [state, dispatch] = useReducer(reducer<ITEMS, FIELD>, { step: Step.Initial });
    const [error, setError] = useState(false);
    const pager = useRef<Pager<ITEMS, FIELD>>(null);

    /**
     * 検索時
     */
    useEffect(() => {
        void (async () => {
            await executeAsync(
                () => func(),
                () => setError(true),
            );
        })();
        async function func() {
            if (!search) {
                return;
            }
            pager.current = createPager(fetchCallback, { initialPage, perPage, query });
            const page = await pager.current.current();
            // if (page.tag === 'ok') {
            if (isOkData(page)) {
                toOk(dispatch, page.data.items, page.data.currentPage);
            }
            if (isInvalid(page)) {
                toInvalid(dispatch, page.violations);
            }
        }
    }, [fetchCallback, initialPage, perPage, query, search]);

    /**
     * 検索結果の反映
     */
    useEffect(() => {
        // dispatchした結果のstateを同じeffect内で安全に見られない。
        // dispatchした結果のstateを他コンポーネントに連携する関係で結果のstateを取得する必要がある。
        // そのため別の依存配列の別effectにしている。
        execute(
            () => func(),
            () => setError(true),
        );
        function func() {
            if (state.step === Step.Ok) {
                setItems(state.items);
            }
            if (state.step === Step.Invalid) {
                setViolations(state.violations);
            }
        }
    }, [setItems, setViolations, state]);

    return { error, state, pager, dispatch, setError };
}

/**
 * 次へ／前へボタン イベントハンドラー
 *
 * @typeParam T - アイテムの型
 */
export async function executePagination<ITEMS, FIELD extends string>(
    destination: 'next' | 'prev',
    pager: React.RefObject<Pager<ITEMS, FIELD> | null>,
    dispatch: React.ActionDispatch<[action: Action<ITEMS, FIELD>]>,
    setError: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<void> {
    await executeAsync(
        () => func(),
        () => setError(true),
    );
    async function func() {
        if (pager?.current == null) {
            return;
        }
        const page = destination === 'next' ? await pager.current.next() : await pager.current.prev();
        // if (page.tag === 'ok') {
        if (isOkData(page)) {
            toOk(dispatch, page.data.items, page.data.currentPage);
        }
        if (isInvalid(page)) {
            toInvalid(dispatch, page.violations);
        }
    }
}

export function executeSearch<ITEMS, FIELD extends string>(
    dispatch: React.ActionDispatch<[action: Action<ITEMS, FIELD>]>,
    query: FormData<FIELD>,
    setQuery: React.Dispatch<React.SetStateAction<FormData<FIELD>>>,
    setSearch: React.Dispatch<React.SetStateAction<boolean>>,
) {
    setQuery(query);
    setSearch(true);
}
