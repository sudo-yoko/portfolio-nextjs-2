//
// カスタムフック＆関連するイベントハンドラー
//
import 'client-only';

import { withAdviceAsync } from '@/presentation/_system/aop/aop.client-side';
import { resultError } from '@/presentation/_system/error/error.factories';
import { createPager } from '@/presentation/_system/pagination/mvvm/models/pagination.pager';
import { PaginationResult } from '@/presentation/_system/pagination/mvvm/models/pagination.types';
import { PageData, Pager } from '@/presentation/_system/pagination/mvvm/models/pagination.types.c';
import {
    Action,
    cancel,
    reducer,
    reset,
    setError,
    setViolations,
    State,
    Step,
    toIdle,
    toNext,
    toPrev,
    toSearch,
} from '@/presentation/_system/pagination/mvvm/view-models/pagination.reducer.2';
import { isInvalid, isOkData } from '@/presentation/_system/result/result.helpers';
import { hasError } from '@/presentation/_system/validation/validation.helpers';
import { FormData } from '@/presentation/_system/validation/validation.types';
import { fetchPage } from '@/presentation/users/mvvm/models/users.requester';
import { FormKeys, User } from '@/presentation/users/mvvm/models/users.types';
import { validate } from '@/presentation/users/mvvm/models/users.validator';
import { initialPage, initialState, perPage } from '@/presentation/users/mvvm/view-models/users.reducer';
import React, { useCallback, useEffect, useReducer, useRef } from 'react';

/**
 * 検索 カスタムフック
 */
export function usePagination() {
    const [state, dispatch] = useReducer(reducer<User[], FormKeys>, initialState);
    const pager = useRef<Pager<User[], FormKeys>>(null);
    const fetchCallback = useCallback(
        (offset: number, perPage: number, query: FormData<FormKeys>) => fetchPage(offset, perPage, query),
        [],
    );
    useEffect(() => {
        void (async () => {
            await withAdviceAsync(
                () => _(),
                () => {
                    cancel(dispatch);
                    setError(dispatch, true);
                },
            );
        })();
        async function _() {
            if (state.step === Step.Search) {
                pager.current = createPager(fetchCallback, {
                    initialPage,
                    perPage,
                    formData: state.formData,
                });
                const page = await pager.current.current();
                await handleResult(page, dispatch);
            }
            if (state.step === Step.Next) {
                if (pager?.current == null) {
                    return;
                }
                const page = await pager.current.next();
                await handleResult(page, dispatch);
            }
            if (state.step === Step.Prev) {
                if (pager?.current == null) {
                    return;
                }
                const page = await pager.current.prev();
                await handleResult(page, dispatch);
            }
        }
    }, [fetchCallback, state.formData, state.step]);

    return { state, dispatch };
}

async function handleResult(
    result: PaginationResult<PageData<User[]>, FormKeys>,
    dispatch: React.ActionDispatch<[action: Action<User[], FormKeys>]>,
) {
    const location = 'users.use-pagination.2.ts#handleResult';

    if (isOkData(result)) {
        toIdle(dispatch, result.data.items, result.data.currentPage);
        return;
    }
    if (isInvalid(result)) {
        if (hasError(result.violations)) {
            setViolations(dispatch, result.violations);
            return;
        }
    }
    throw resultError({ result, location });
}

export async function handleSearch(
    state: State<User[], FormKeys>,
    dispatch: React.ActionDispatch<[action: Action<User[], FormKeys>]>,
) {
    const query: FormData<FormKeys> = { keyword: state.formData.keyword };
    const violations = validate(query);
    if (hasError(violations)) {
        setViolations(dispatch, violations);
        return;
    }
    toSearch(dispatch, query);
}

export async function handleNext(
    dispatch: React.ActionDispatch<[action: Action<User[], FormKeys>]>,
): Promise<void> {
    toNext(dispatch);
}

export async function handlePrev(
    dispatch: React.ActionDispatch<[action: Action<User[], FormKeys>]>,
): Promise<void> {
    toPrev(dispatch);
}

export function handleReset(dispatch: React.ActionDispatch<[action: Action<User[], FormKeys>]>) {
    reset(dispatch, initialState);
}
