import 'client-only';

import React, { useEffect, useReducer } from 'react';

import { useWithAdvice } from '@/presentation/_system/aspect/aspect.client.useWithAdvice';
import { isInvalid, isOkData } from '@/presentation/_system/result/result.helpers';
import { hasError } from '@/presentation/_system/validation/validation.helpers';
import { FormData } from '@/presentation/_system/validation/validation.types';
import { fetchData } from '@/presentation/user-list/models/user-list.client';
import { FormKeys } from '@/presentation/user-list/models/user-list.types';
import { validate } from '@/presentation/user-list/models/user-list.validator';
import {
    Action,
    initialState,
    reducer,
    reset,
    setViolations,
    State,
    Step,
    toIdle,
    toSearch,
} from '@/presentation/user-list/view-models/user-list.reducer';

export function useSearch() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { withAdviceAsync } = useWithAdvice();

    useEffect(() => {
        void (async () => {
            await withAdviceAsync(() => _());
        })();
        async function _() {
            if (state.step !== Step.Search) {
                return;
            }
            const data = await fetchData(100, state.formData);
            if (isOkData(data)) {
                toIdle(dispatch, data.data);
            }
            if (isInvalid(data)) {
                setViolations(dispatch, data.violations);
            }
        }
    }, [state.formData, state.step]);

    return { state, dispatch };
}

export function handleReset(dispatch: React.ActionDispatch<[action: Action]>) {
    reset(dispatch, initialState);
}

export function handleSearch(state: State, dispatch: React.ActionDispatch<[action: Action]>) {
    const query: FormData<FormKeys> = { keyword: state.formData.keyword };
    const violations = validate(query);
    if (hasError(violations)) {
        setViolations(dispatch, violations);
        return;
    }
    toSearch(dispatch, query);
}
