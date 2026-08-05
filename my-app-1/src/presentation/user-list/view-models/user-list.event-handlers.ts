import 'client-only';

import React from 'react';

import { hasError } from '@/presentation/_system/validation/validation.helpers';
import { FormData } from '@/presentation/_system/validation/validation.types';
import { FormKeys } from '@/presentation/user-list/models/user-list.types';
import { validate } from '@/presentation/user-list/models/user-list.validator';
import {
    Action,
    initialState,
    reset,
    setViolations,
    State,
    toSearch,
} from '@/presentation/user-list/view-models/user-list.reducer';

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
