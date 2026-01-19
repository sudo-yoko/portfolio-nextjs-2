'use client';

import { getViolationsMap, initialFormDataCore } from '@/presentation/_system/validation/validation.helpers';
import { FormData, Violations, ViolationsMap } from '@/presentation/_system/validation/validation.types';
import { FormKeys } from '@/presentation/admin-console/api-console/_individual/customers/models/api-console.customers.types';
import React, { Reducer } from 'react';

export type State = {
    formData: FormData<FormKeys>;
    violations: Violations<FormKeys>;
    violationsMap: ViolationsMap<FormKeys>;
};

export const initialState: State = {
    formData: initialFormData(),
    violations: [],
    violationsMap: {},
};

export function initialFormData() {
    const initial = initialFormDataCore(FormKeys);
    initial.customerId = '1234567890';
    return initial;
}

export const ActionType = {
    ValueChanged: 'valueChanged',
    ViolationsChanged: 'violationsChanged',
} as const;
export type ActionType = (typeof ActionType)[keyof typeof ActionType];

export type Action =
    | { type: typeof ActionType.ValueChanged; key: FormKeys; value: string }
    | {
          type: typeof ActionType.ViolationsChanged;
          violations: Violations<FormKeys>;
          violationsMap: ViolationsMap<FormKeys>;
      };

export function setValue(dispatch: React.Dispatch<Action>, key: FormKeys, value: string): void {
    dispatch({ type: ActionType.ValueChanged, key, value });
}

export function setViolations(dispatch: React.Dispatch<Action>, violations: Violations<FormKeys>): void {
    dispatch({ type: ActionType.ViolationsChanged, violations, violationsMap: getViolationsMap(violations) });
}

export const reducer: Reducer<State, Action> = (state: State, action: Action) => {
    switch (action.type) {
        case ActionType.ValueChanged:
            return {
                ...state,
                violations: [],
                violationsMap: {},
                formData: { ...state.formData, [action.key]: action.value },
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
};
