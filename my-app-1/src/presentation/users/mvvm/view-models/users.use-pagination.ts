//
// カスタムフック＆関連するイベントハンドラー
//
import 'client-only';

import { executeAsync } from '@/presentation/(system)/aop/aop.feature.client';
import { createPager } from '@/presentation/(system)/pagination/mvvm/models/pagination.pager';
import { Pager } from '@/presentation/(system)/pagination/mvvm/models/pagination.types.c';
import {
    Action,
    reducer,
    reset,
    setViolations,
    State,
    Step,
    // toResult,
    toSearch,
} from '@/presentation/(system)/pagination/mvvm/view-models/pagination.reducer.2';
import { isInvalid, isOkData } from '@/presentation/(system)/result/result.core.helpers';
import { hasError } from '@/presentation/(system)/validation/validation.helpers';
import { FormData } from '@/presentation/(system)/validation/validation.types';
import { fetchPage } from '@/presentation/users/mvvm/models/users.requester';
import { FormKeys, User } from '@/presentation/users/mvvm/models/users.types';
import { validate } from '@/presentation/users/mvvm/models/users.validator';
import { initialState } from '@/presentation/users/mvvm/view-models/users.reducer';
import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react';

/**
 * 検索 カスタムフック
 */
export function usePagination({
    // search,
    // fetchCallback,
    initialPage,
    perPage,
    // query,
    // setItems,
    // setViolations,
}: {
    // search: boolean;
    // fetchCallback: FetchPage<User[], FormKeys>;
    initialPage: number;
    perPage: number;
    // query: FormData<FormKeys>;
    // setItems: React.Dispatch<React.SetStateAction<ITEMS>>;
    // setViolations: React.Dispatch<React.SetStateAction<Violations<FIELD>>>;
}) {
    const [state, dispatch] = useReducer(reducer<User[], FormKeys>, initialState);
    const [error, setError] = useState(false);
    const pager = useRef<Pager<User[], FormKeys>>(null);
    const fetchCallback = useCallback(
        (offset: number, perPage: number, query: FormData<FormKeys>) => fetchPage(offset, perPage, query),
        [],
    );

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
            // if (!search) {
            if (state.step !== Step.Search) {
                return;
            }
            pager.current = createPager(fetchCallback, { initialPage, perPage, query: state.query });
            const page = await pager.current.current();
            // if (page.tag === 'ok') {
            if (isOkData(page)) {
                // toResult(dispatch, page.data.items, page.data.currentPage);
            }
            if (isInvalid(page)) {
                setViolations(dispatch, page.violations);
            }
        }
    }, [fetchCallback, initialPage, perPage, state.query, state.step]);

    /**
     * 検索結果の反映
     */
    // useEffect(() => {
    // dispatchした結果のstateを同じeffect内で安全に見られない。
    // dispatchした結果のstateを他コンポーネントに連携する関係で結果のstateを取得する必要がある。
    // そのため別の依存配列の別effectにしている。
    // execute(
    // () => func(),
    // () => setError(true),
    // );
    // function func() {
    // if (state.step === Step.Ok) {
    // setItems(state.items);
    // toOk(dispatch, state.items, state.page);
    // }
    // if (state.step === Step.Invalid) {
    // setViolations(state.violations);
    // toInvalid(dispatch, state.violations);
    // }
    // }
    // }, [state.items, state.page, state.step, state.violations]);

    return { error, state, pager, dispatch, setError };
}

export function handleReset(dispatch: React.ActionDispatch<[action: Action<User[], FormKeys>]>) {
    reset(dispatch, initialState);
}

export function handleSearch(
    state: State<User[], FormKeys>,
    dispatch: React.ActionDispatch<[action: Action<User[], FormKeys>]>,
) {
    const query: FormData<FormKeys> = { userName: state.query.userName };
    const violations = validate(query);
    if (hasError(violations)) {
        setViolations(dispatch, violations);
        return;
    }
    toSearch(dispatch, query);
    // executeSearch<User[], FormKeys>(dispatch, data, setQuery, setSearch);
}

/**
 * 次へ／前へボタン イベントハンドラー
 *
 * @typeParam T - アイテムの型
 */
export async function handlePagination(
    destination: 'next' | 'prev',
    pager: React.RefObject<Pager<User[], FormKeys> | null>,
    dispatch: React.ActionDispatch<[action: Action<User[], FormKeys>]>,
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
            // toResult(dispatch, page.data.items, page.data.currentPage);
        }
        if (isInvalid(page)) {
            setViolations(dispatch, page.violations);
        }
    }
}

// export function executeSearch<ITEMS, FIELD extends string>(
// dispatch: React.ActionDispatch<[action: Action<ITEMS, FIELD>]>,
// query: FormData<FIELD>,
// ) {
// toSearch(dispatch, query);
// }
