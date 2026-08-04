import 'client-only';

import React from 'react';

import { getViolationsMap, initialFormDataCore } from '@/presentation/_system/validation/validation.helpers';
import { FormData, Violations, ViolationsMap } from '@/presentation/_system/validation/validation.types';
import { User } from '@/presentation/backend-lib/users/users.types';
import { FormKeys } from '@/presentation/user-list/models/user-list.types';

export const Step = {
    Idle: 'idle',
    Search: 'search',
} as const;
export type Step = (typeof Step)[keyof typeof Step];

export type State = {
    step: Step;
    formData: FormData<FormKeys>;
    items: User[];
    violations: Violations<FormKeys>;
    violationsMap: ViolationsMap<FormKeys>;
    error: boolean;
};

export const initialState: State = {
    step: Step.Idle,
    formData: initialFormData(),
    items: [],
    violations: [],
    violationsMap: {},
    error: false,
};

function initialFormData(): FormData<FormKeys> {
    const initial = initialFormDataCore(FormKeys);
    return initial;
}

export const ActionType = {
    ToIdle: 'toIdle',
    SetFormData: 'setFormData',
    SetViolations: 'setViolations',
    ToSearch: 'toSearch',
    Reset: 'reset',
    SetError: 'setError',
    Cancel: 'cancel',
} as const;
export type ActionType = (typeof ActionType)[keyof typeof ActionType];

export type Action =
    | { type: typeof ActionType.ToIdle; items: User[] }
    | { type: typeof ActionType.SetFormData; key: FormKeys; value: string }
    | {
          type: typeof ActionType.SetViolations;
          violations: Violations<FormKeys>;
          violationsMap: ViolationsMap<FormKeys>;
      }
    | { type: typeof ActionType.ToSearch; query: FormData<FormKeys> }
    | { type: typeof ActionType.Reset; initialState: State }
    | { type: typeof ActionType.SetError; error: boolean }
    | { type: typeof ActionType.Cancel };

export function toIdle(dispatch: React.ActionDispatch<[action: Action]>, items: User[]): void {
    const action: Action = { type: ActionType.ToIdle, items };
    dispatch(action);
}

export function setKeyword(
    dispatch: React.ActionDispatch<[action: Action]>,
    key: FormKeys,
    value: string,
): void {
    const action: Action = { type: ActionType.SetFormData, key, value };
    dispatch(action);
}

export function setViolations(
    dispatch: React.ActionDispatch<[action: Action]>,
    violations: Violations<FormKeys>,
): void {
    const action: Action = {
        type: ActionType.SetViolations,
        violations,
        violationsMap: getViolationsMap(violations),
    };
    dispatch(action);
}

export function toSearch(dispatch: React.ActionDispatch<[action: Action]>, query: FormData<FormKeys>): void {
    const action: Action = {
        type: ActionType.ToSearch,
        query,
    };
    dispatch(action);
}

export function reset(dispatch: React.ActionDispatch<[action: Action]>, initialState: State): void {
    const action: Action = {
        type: ActionType.Reset,
        initialState,
    };
    dispatch(action);
}

export function setError(dispatch: React.ActionDispatch<[action: Action]>, error: boolean): void {
    const action: Action = {
        type: ActionType.SetError,
        error,
    };
    dispatch(action);
}

export function cancel(dispatch: React.ActionDispatch<[action: Action]>): void {
    const action: Action = {
        type: ActionType.Cancel,
    };
    dispatch(action);
}

export function reducer(state: State, action: Action): State {
    switch (action.type) {
        case ActionType.ToIdle:
            return { ...state, step: Step.Idle, items: action.items };
        case ActionType.SetFormData:
            return {
                ...state,
                violations: [],
                violationsMap: {},
                formData: { ...state.formData, [action.key]: action.value },
            };
        case ActionType.SetViolations:
            return {
                ...state,
                violations: action.violations,
                violationsMap: action.violationsMap,
            };
        case ActionType.ToSearch:
            return {
                ...state,
                step: Step.Search,
                formData: action.query,
            };
        case ActionType.Reset:
            return {
                ...action.initialState,
            };
        case ActionType.SetError:
            return {
                ...state,
                error: action.error,
            };
        case ActionType.Cancel:
            return {
                ...state,
                step: Step.Idle,
            };
        default:
            return state;
    }
}
