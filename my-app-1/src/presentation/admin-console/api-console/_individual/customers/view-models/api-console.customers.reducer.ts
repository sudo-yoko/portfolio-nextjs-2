'use client';

import { getViolationsMap, initialFormDataCore } from '@/presentation/_system/validation/validation.helpers';
import { FormData, Violations, ViolationsMap } from '@/presentation/_system/validation/validation.types';
import { FormKeys } from '@/presentation/admin-console/api-console/_individual/customers/models/api-console.customers.types';
import React, { Reducer } from 'react';

export const Step = {
    Idle: 'idle',
    Send: 'send',
} as const;
export type Step = (typeof Step)[keyof typeof Step];

export type State = {
    step: Step;
    formData: FormData<FormKeys>;
    violations: Violations<FormKeys>;
    violationsMap: ViolationsMap<FormKeys>;
    abortMsg: string[];
};

export const initialState: State = {
    step: Step.Idle,
    formData: initialFormData(),
    violations: [],
    violationsMap: {},
    abortMsg: [],
};

export function initialFormData() {
    const initial = initialFormDataCore(FormKeys);
    initial.customerId = '1234567890';
    return initial;
}

export const ActionType = {
    ValueChanged: 'valueChanged',
    ViolationsChanged: 'violationsChanged',
    SendRequested: 'sendRequested',
    ToIdle: 'toIdle',
    Aborted: 'aborted',
} as const;
export type ActionType = (typeof ActionType)[keyof typeof ActionType];

export type Action =
    | { type: typeof ActionType.ValueChanged; key: FormKeys; value: string }
    | {
          type: typeof ActionType.ViolationsChanged;
          violations: Violations<FormKeys>;
          violationsMap: ViolationsMap<FormKeys>;
      }
    | { type: typeof ActionType.SendRequested }
    | { type: typeof ActionType.ToIdle }
    | { type: typeof ActionType.Aborted; abortMsg: string[] };

export function setValue(dispatch: React.Dispatch<Action>, key: FormKeys, value: string): void {
    dispatch({ type: ActionType.ValueChanged, key, value });
}

export function setViolations(dispatch: React.Dispatch<Action>, violations: Violations<FormKeys>): void {
    dispatch({ type: ActionType.ViolationsChanged, violations, violationsMap: getViolationsMap(violations) });
}

export function toSend(dispatch: React.Dispatch<Action>): void {
    dispatch({ type: ActionType.SendRequested });
}

export function toIdle(dispatch: React.Dispatch<Action>): void {
    dispatch({ type: ActionType.ToIdle });
}

export function toAbort(dispatch: React.Dispatch<Action>, abortMsg: string[]): void {
    dispatch({ type: ActionType.Aborted, abortMsg });
}

export const reducer: Reducer<State, Action> = (state: State, action: Action) => {
    switch (action.type) {
        case ActionType.ValueChanged:
            return {
                ...state,
                formData: { ...state.formData, [action.key]: action.value },
            };
        case ActionType.ViolationsChanged:
            return {
                ...state,
                violations: action.violations,
                violationsMap: action.violationsMap,
            };
        case ActionType.SendRequested:
            return {
                ...state,
                step: Step.Send,
            };
        case ActionType.ToIdle:
            return {
                ...state,
                step: Step.Idle,
            };
        case ActionType.Aborted:
            return {
                ...state,
                abortMsg: action.abortMsg,
            };
        default:
            return state;
    }
};
