import 'client-only';

import { getViolationsMap } from '@/presentation/_system/validation/validation.helpers';
import { FormData, Violations, ViolationsMap } from '@/presentation/_system/validation/validation.types';
import React from 'react';

export const Step = {
    Idle: 'idle',
    Search: 'search',
    Next: 'next',
    Prev: 'prev',
} as const;
export type Step = (typeof Step)[keyof typeof Step];

// export type StepProcessing = typeof Step.Search | typeof Step.Next | typeof Step.Prev; // TODO:

export type State<ITEMS, FIELD extends string> = {
    step: Step;
    query: FormData<FIELD>;
    items: ITEMS;
    page: number;
    violations: Violations<FIELD>;
    violationsMap: ViolationsMap<FIELD>;
    error: boolean;
};

export const ActionType = {
    ToIdle: 'toIdle',
    SetQuery: 'setQuery',
    SetViolations: 'setViolations',
    ToSearch: 'toSearch',
    ToNext: 'toNext',
    ToPrev: 'toPrev',
    Reset: 'reset',
    SetError: 'setError',
    Cancel: 'cancel',
} as const;
export type ActionType = (typeof ActionType)[keyof typeof ActionType];

export type Action<ITEMS, FIELD extends string> =
    | { type: typeof ActionType.ToIdle; items: ITEMS; page: number }
    | { type: typeof ActionType.SetQuery; key: FIELD; value: string }
    | {
          type: typeof ActionType.SetViolations;
          violations: Violations<FIELD>;
          violationsMap: ViolationsMap<FIELD>;
      }
    | { type: typeof ActionType.ToSearch; query: FormData<FIELD> }
    | { type: typeof ActionType.ToNext }
    | { type: typeof ActionType.ToPrev }
    | { type: typeof ActionType.Reset; initialState: State<ITEMS, FIELD> }
    | { type: typeof ActionType.SetError; error: boolean }
    | { type: typeof ActionType.Cancel };

export function toIdle<ITEMS, FIELD extends string>(
    dispatch: React.ActionDispatch<[action: Action<ITEMS, FIELD>]>,
    items: ITEMS,
    page: number,
): void {
    const action: Action<ITEMS, FIELD> = { type: ActionType.ToIdle, items, page };
    dispatch(action);
}

export function setQuery<ITEMS, FIELD extends string>(
    dispatch: React.ActionDispatch<[action: Action<ITEMS, FIELD>]>,
    key: FIELD,
    value: string,
): void {
    const action: Action<ITEMS, FIELD> = { type: ActionType.SetQuery, key, value };
    dispatch(action);
}

export function setViolations<ITEMS, FIELD extends string>(
    dispatch: React.ActionDispatch<[action: Action<ITEMS, FIELD>]>,
    violations: Violations<FIELD>,
): void {
    const action: Action<ITEMS, FIELD> = {
        type: ActionType.SetViolations,
        violations,
        violationsMap: getViolationsMap(violations),
    };
    dispatch(action);
}

export function toSearch<ITEMS, FIELD extends string>(
    dispatch: React.ActionDispatch<[action: Action<ITEMS, FIELD>]>,
    query: FormData<FIELD>,
): void {
    const action: Action<ITEMS, FIELD> = {
        type: ActionType.ToSearch,
        query,
    };
    dispatch(action);
}

export function toNext<ITEMS, FIELD extends string>(
    dispatch: React.ActionDispatch<[action: Action<ITEMS, FIELD>]>,
): void {
    const action: Action<ITEMS, FIELD> = {
        type: ActionType.ToNext,
    };
    dispatch(action);
}

export function toPrev<ITEMS, FIELD extends string>(
    dispatch: React.ActionDispatch<[action: Action<ITEMS, FIELD>]>,
): void {
    const action: Action<ITEMS, FIELD> = {
        type: ActionType.ToPrev,
    };
    dispatch(action);
}

export function reset<ITEMS, FIELD extends string>(
    dispatch: React.ActionDispatch<[action: Action<ITEMS, FIELD>]>,
    initialState: State<ITEMS, FIELD>,
): void {
    const action: Action<ITEMS, FIELD> = {
        type: ActionType.Reset,
        initialState,
    };
    dispatch(action);
}

export function setError<ITEMS, FIELD extends string>(
    dispatch: React.ActionDispatch<[action: Action<ITEMS, FIELD>]>,
    error: boolean,
): void {
    const action: Action<ITEMS, FIELD> = {
        type: ActionType.SetError,
        error,
    };
    dispatch(action);
}

export function cancel<ITEMS, FIELD extends string>(
    dispatch: React.ActionDispatch<[action: Action<ITEMS, FIELD>]>,
): void {
    const action: Action<ITEMS, FIELD> = {
        type: ActionType.Cancel,
    };
    dispatch(action);
}

export function reducer<ITEMS, FIELD extends string>(
    state: State<ITEMS, FIELD>,
    action: Action<ITEMS, FIELD>,
): State<ITEMS, FIELD> {
    switch (action.type) {
        case ActionType.ToIdle:
            return { ...state, step: Step.Idle, items: action.items, page: action.page };
        case ActionType.SetQuery:
            return {
                ...state,
                violations: [],
                violationsMap: {},
                query: { ...state.query, [action.key]: action.value },
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
                query: action.query,
            };
        case ActionType.ToNext:
            return {
                ...state,
                step: Step.Next,
            };
        case ActionType.ToPrev:
            return {
                ...state,
                step: Step.Prev,
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
