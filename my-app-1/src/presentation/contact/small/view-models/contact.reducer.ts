//
// お問い合わせフォーム 状態モデル（ステートマシン）
//
'use client';

import { getViolationsMap } from '@/presentation/_system/validation/validation.helpers';
import { FormData, Violations, ViolationsMap } from '@/presentation/_system/validation/validation.types';
import { FormKeys } from '@/presentation/contact/small/models/contact.types';
import React, { Reducer } from 'react';

export const Mode = {
    Input: 'input',
    Confirm: 'confirm',
    Complete: 'complete',
};
export type Mode = (typeof Mode)[keyof typeof Mode];

export const Step = {
    Idle: 'idle',
    Send: 'send',
    Complete: 'complete',
    Abort: 'abort',
} as const;
export type Step = (typeof Step)[keyof typeof Step];

export type State = {
    mode: Mode;
    step: Step;
    formData: FormData<FormKeys>;
    violations: Violations<FormKeys>;
    violationsMap: ViolationsMap<FormKeys>;
    retryMsg: string[]; // TODO: リトライ回数３回くらいでAbort
    retryableCount: number;
};

export const initialState: State = {
    mode: Mode.Input,
    step: Step.Idle,
    formData: initialFormData(),
    violations: [],
    violationsMap: {},
    retryMsg: [],
    retryableCount: 0,
};

// TODO: 共通化できるか
function initialFormData(): FormData<FormKeys> {
    const initial = Object.fromEntries(Object.values(FormKeys).map((key) => [key, ''])) as FormData<FormKeys>;
    initial.email = 'test@mail.com';
    return initial;
}

export const ActionType = {
    SetValue: 'setValue',
    SetViolations: 'setViolations',
    ToConfirm: 'toConfirm',
    ToInput: 'toInput',
    ToSend: 'toSend',
    SetRetryMsg: 'setRetryMsg',
    SetAbort: 'setAbort',
    ToComplete: 'toComplete',
    Reset: 'reset',
} as const;
export type ActionType = (typeof ActionType)[keyof typeof ActionType];

export type Action =
    | { type: typeof ActionType.SetValue; key: FormKeys; value: string }
    | {
          type: typeof ActionType.SetViolations;
          violations: Violations<FormKeys>;
          violationsMap: ViolationsMap<FormKeys>;
      }
    | { type: typeof ActionType.ToConfirm }
    | { type: typeof ActionType.ToInput }
    | { type: typeof ActionType.ToSend }
    | { type: typeof ActionType.SetRetryMsg; retryMsg: string[] }
    | { type: typeof ActionType.SetAbort }
    | { type: typeof ActionType.ToComplete }
    | { type: typeof ActionType.Reset };

/**
 * 状態の更新：フォームに値を入力
 */
export function setValue(
    dispatch: React.ActionDispatch<[action: Action]>,
    key: FormKeys,
    value: string,
): void {
    dispatch({ type: ActionType.SetValue, key, value });
}

/**
 * 状態の更新：バリデーションエラー
 */
export function setViolations(
    dispatch: React.ActionDispatch<[action: Action]>,
    violations: Violations<FormKeys>,
): void {
    dispatch({ type: ActionType.SetViolations, violations, violationsMap: getViolationsMap(violations) });
}

/**
 * 状態の更新：確認
 */
export function toConfirm(dispatch: React.ActionDispatch<[action: Action]>): void {
    dispatch({ type: ActionType.ToConfirm });
}

/**
 * 状態の更新：入力
 */
export function toInput(dispatch: React.ActionDispatch<[action: Action]>): void {
    dispatch({ type: ActionType.ToInput });
}

/**
 * 状態の更新：送信中
 */
export function toSend(dispatch: React.ActionDispatch<[action: Action]>): void {
    dispatch({ type: ActionType.ToSend });
}

/**
 * 状態の更新：再試行可能なエラー
 */
export function setRetryMsg(dispatch: React.ActionDispatch<[action: Action]>, retryMsg: string[]): void {
    dispatch({ type: ActionType.SetRetryMsg, retryMsg });
}

/**
 * 状態の更新：続行不可能なエラー
 */
export function setAbort(dispatch: React.ActionDispatch<[action: Action]>): void {
    dispatch({ type: ActionType.SetAbort });
}

/**
 * 状態の更新：完了
 */
export function toComplete(dispatch: React.ActionDispatch<[action: Action]>): void {
    dispatch({ type: ActionType.ToComplete });
}

/**
 * 状態の更新：フォームをリセット
 */
export function reset(dispatch: React.ActionDispatch<[action: Action]>): void {
    dispatch({ type: ActionType.Reset });
}

/**
 * 状態管理関数
 * 現在の状態とアクションを受け取り、新しい状態を返す
 *
 * @param state - 現在の状態
 * @param action - dispatchに渡されたアクション
 * @returns 新しい状態
 */
export const reducer: Reducer<State, Action> = (state: State, action: Action): State => {
    switch (action.type) {
        case ActionType.SetValue:
            return {
                ...state,
                formData: { ...state.formData, [action.key]: action.value },
            };
        case ActionType.SetViolations:
            return { ...state, violations: action.violations, violationsMap: action.violationsMap };
        case ActionType.ToConfirm:
            return { ...state, mode: Mode.Confirm, retryMsg: [] };
        case ActionType.ToInput:
            return { ...state, mode: Mode.Input };
        case ActionType.ToSend:
            return { ...state, step: Step.Send, retryMsg: [] };
        case ActionType.SetRetryMsg:
            return {
                ...state,
                retryMsg: action.retryMsg,
                step: Step.Idle,
                retryableCount: action.retryMsg.length > 0 ? state.retryableCount + 1 : state.retryableCount, // NOTE: ++は使わないこと
            };
        case ActionType.SetAbort:
            return { ...state, step: Step.Abort };
        case ActionType.ToComplete:
            return {
                ...state,
                mode: Mode.Complete,
                step: Step.Complete,
            };
        case ActionType.Reset:
            return { ...initialState };
        default:
            return state;
    }
};
