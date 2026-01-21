'use client';

import { getViolationsMap } from '@/presentation/_system/validation/validation.helpers';
import { FormData, Violations, ViolationsMap } from '@/presentation/_system/validation/validation.types';
import React from 'react';

export type State<FIELD extends string> = {
    formData: FormData<FIELD>;
    violations: Violations<FIELD>;
    violationsMap: ViolationsMap<FIELD>;
};

export const ActionType = {
    ValueChanged: 'valueChanged',
    ViolationsChanged: 'violationsChanged',
} as const;
export type ActionType = (typeof ActionType)[keyof typeof ActionType];

export type Action<FIELD extends string> =
    | { type: typeof ActionType.ValueChanged; key: FIELD; value: string }
    | {
          type: typeof ActionType.ViolationsChanged;
          violations: Violations<FIELD>;
          violationsMap: ViolationsMap<FIELD>;
      };

export function setValue<FIELD extends string>(
    dispatch: React.Dispatch<Action<FIELD>>,
    key: FIELD,
    value: string,
): void {
    dispatch({ type: ActionType.ValueChanged, key, value });
}

export function setViolations<FIELD extends string>(
    dispatch: React.Dispatch<Action<FIELD>>,
    violations: Violations<FIELD>,
): void {
    dispatch({ type: ActionType.ViolationsChanged, violations, violationsMap: getViolationsMap(violations) });
}

export function reducer<FIELD extends string>(state: State<FIELD>, action: Action<FIELD>): State<FIELD> {
    // export const reducer:  Reducer<State, Action> = (state: State, action: Action) => {
    switch (action.type) {
        case ActionType.ValueChanged:
            return {
                ...state,
                formData: { ...state.formData, [action.key]: action.value },
                // TODO: 変更されたフィールドのエラーだけをクリアする
                violations: [...state.violations, { field: action.key, violation: [] }],
                // violationsMap: { ...state.violationsMap, [action.key]: '' }, // TODO: これがコンパイルエラーにならないのはどうしてか
                violationsMap: { ...state.violationsMap, [action.key]: [] },
            };
        case ActionType.ViolationsChanged:
            return {
                ...state,
                violations: action.violations,
                violationsMap: action.violationsMap,
            };
        default:
            return state;
    }
}
