//
// お問い合わせフォーム 状態モデル（ステートマシン）
//
'use client';

import { FormData, Violations } from '@/presentation/(system)/validation/validation.types';
import { FormKeys } from '@/presentation/contact/mvvm/models/contact.types';
import React, { Reducer } from 'react';

/**
 * フォームの値を格納するオブジェクトの定義
 */
//export type FormData = {
//  [key in FormKey]: string;
//};

/**
 * ステップ定義
 * 入力、確認、送信中、完了
 */
// export type Step = 'input' | 'confirm' | 'sending' | 'complete';
export const Step = {
    input: 'input',
    confirm: 'confirm',
    sending: 'sending',
    complete: 'complete',
} as const;
export type Step = (typeof Step)[keyof typeof Step];

/**
 * 状態定義
 * ステップ、フォームデータ、バリデーションエラー
 */
export type State = {
    step: Step;
    formData: FormData<FormKeys>;
    violations: Violations<FormKeys>;
    retryMsg: string[];
};

/**
 * 初期状態
 */
export const initialState: State = {
    step: Step.input,
    formData: { name: '', email: '', body: '' },
    violations: {},
    retryMsg: [],
};

/**
 * アクション定義
 */
export const ActionType = {
    toInput: 'toInput',
    toConfirm: 'toConfirm',
    toSending: 'toSending',
    toComplete: 'toComplete',
    setValue: 'setValue',
    setViolations: 'setViolations',
    setRetryable: 'setRetryable',
} as const;
export type ActionType = (typeof ActionType)[keyof typeof ActionType];

export type Action =
    | { type: typeof ActionType.toInput }
    | { type: typeof ActionType.toConfirm }
    | { type: typeof ActionType.toSending }
    | { type: typeof ActionType.toComplete }
    | { type: typeof ActionType.setValue; key: FormKeys; value: string }
    | { type: typeof ActionType.setViolations; violations: Violations<FormKeys> }
    | { type: typeof ActionType.setRetryable; retryMsg: string[] };

/**
 * 状態の更新：フォームに値を入力
 */
export function setValue(
    dispatch: React.ActionDispatch<[action: Action]>,
    key: FormKeys,
    value: string,
): void {
    dispatch({ type: ActionType.setValue, key, value });
}

/**
 * 状態の更新：入力モード
 */
export function toInput(dispatch: React.ActionDispatch<[action: Action]>): void {
    dispatch({ type: ActionType.toInput });
}

/**
 * 状態の更新：確認モード
 */
export function toConfirm(dispatch: React.ActionDispatch<[action: Action]>): void {
    dispatch({ type: ActionType.toConfirm });
}

/**
 * 状態の更新：送信中
 */
export function toSending(dispatch: React.ActionDispatch<[action: Action]>): void {
    dispatch({ type: ActionType.toSending });
}

/**
 * 状態の更新：完了
 */
export function toComplete(dispatch: React.ActionDispatch<[action: Action]>): void {
    dispatch({ type: ActionType.toComplete });
}

/**
 * 状態の更新：バリデーションエラー
 */
export function setViolations(
    dispatch: React.ActionDispatch<[action: Action]>,
    violations: Violations<FormKeys>,
): void {
    dispatch({ type: ActionType.setViolations, violations });
}

/**
 * 状態の更新：再試行可能なエラー
 */
export function setRetryable(dispatch: React.ActionDispatch<[action: Action]>, retryMsg: string[]): void {
    dispatch({ type: ActionType.setRetryable, retryMsg });
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
        case ActionType.setValue:
            return setValueState(state, action);
        case ActionType.toInput:
            return { ...state, step: Step.input };
        case ActionType.toConfirm:
            return { ...state, step: Step.confirm, violations: {} };
        case ActionType.toSending:
            return { ...state, step: Step.sending };
        case ActionType.toComplete:
            return toCompleteState(state);
        case ActionType.setViolations:
            return { ...state, violations: action.violations };
        case ActionType.setRetryable:
            return { ...state, retryMsg: action.retryMsg };
        default:
            return state;
    }
};

const setValueState = (
    state: State,
    action: Extract<Action, { type: typeof ActionType.setValue }>,
): State => {
    return {
        ...state,
        formData: { ...state.formData, [action.key]: action.value },
    };
};

const toCompleteState = (state: State): State => {
    return {
        ...state,
        step: Step.complete,
        violations: {},
    };
};
