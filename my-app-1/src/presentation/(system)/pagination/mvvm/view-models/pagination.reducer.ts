//
// 状態管理
//
import { Violations } from '@/presentation/(system)/validation/validation.types';
import React from 'react';

/**
 * ステップ定義
 * - initial  - 初期状態(検索前)
 * - results  - 検索結果
 */
//export type Step = 'initial' | 'results';
export const Step = {
    Initial: 'initial',
    Ok: 'ok',
    Invalid: 'invalid',
} as const;
export type Step = (typeof Step)[keyof typeof Step];

/**
 * 状態定義
 * - step   - ステップ
 * - items  - リストアイテム
 */
export type State<ITEMS, FIELD extends string = never> = Initial | Ok<ITEMS> | Invalid<FIELD>;

export type Initial = {
    step: typeof Step.Initial;
    // items?: undefined;
    // page?: undefined;
};

export type Ok<ITEMS> = {
    step: typeof Step.Ok;
    items: ITEMS;
    page: number;
};

export type Invalid<FIELD extends string> = {
    step: typeof Step.Invalid;
    violations: Violations<FIELD>;
};

/**
 * アクション定義
 * - setItems - 検索結果のセット
 * - reset    - 検索結果のリセット
 */
export const ActionType = {
    SetItems: 'setItems',
    Reset: 'reset',
    SetViolations: 'setViolations',
} as const;
export type ActionType = (typeof ActionType)[keyof typeof ActionType];

// export type Action<T> = { type: 'setItems'; items: T; page: number } | { type: 'reset' };
export type Action<ITEMS, FIELD extends string = never> =
    | { type: typeof ActionType.SetItems; items: ITEMS; page: number }
    | { type: typeof ActionType.Reset }
    | { type: typeof ActionType.SetViolations; violations: Violations<FIELD> };

/**
 * 状態管理関数
 *
 * 現在の状態とアクションを受け取り、新しい状態を返す
 */
// constを使って型注釈をつける場合、型パラメータは使えない
export function reducer<ITEMS, FIELD extends string = never>(
    state: State<ITEMS, FIELD>,
    action: Action<ITEMS, FIELD>,
): State<ITEMS, FIELD> {
    switch (action.type) {
        case ActionType.SetItems:
            const results: Ok<ITEMS> = { step: Step.Ok, items: action.items, page: action.page };
            return results;
        case ActionType.Reset:
            const initial: Initial = { step: Step.Initial };
            return initial;
        case ActionType.SetViolations:
            const invalid: Invalid<FIELD> = { step: Step.Invalid, violations: action.violations };
            return invalid;
        default:
            return state;
    }
}

/**
 * 状態の更新：検索結果のセット
 */
export function toOk<ITEMS>(
    dispatch: React.ActionDispatch<[action: Action<ITEMS>]>,
    items: ITEMS,
    page: number,
): void {
    const action: Action<ITEMS> = { type: ActionType.SetItems, items, page };
    dispatch(action);
}

/**
 * 状態の更新：検索結果のリセット
 */
export function toInitial<ITEMS>(dispatch: React.ActionDispatch<[action: Action<ITEMS>]>): void {
    const action: Action<ITEMS> = { type: ActionType.Reset };
    dispatch(action);
}

/**
 * 状態の更新：バリデーションエラー
 */
export function toInvalid<ITEMS, FIELD extends string>(
    dispatch: React.ActionDispatch<[action: Action<ITEMS, FIELD>]>,
    violations: Violations<FIELD>,
): void {
    const action: Action<ITEMS, FIELD> = { type: ActionType.SetViolations, violations };
    dispatch(action);
}
