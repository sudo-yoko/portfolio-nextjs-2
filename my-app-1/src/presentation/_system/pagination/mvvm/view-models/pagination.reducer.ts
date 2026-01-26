//
// 状態管理
//
import { getViolationsMap } from '@/presentation/_system/validation/validation.helpers';
import { FormData, Violations, ViolationsMap } from '@/presentation/_system/validation/validation.types';
import React from 'react';

/**
 * ステップ定義
 */
export const Step = {
    Initial: 'initial',
    Search: 'search',
    Ok: 'ok',
    // Invalid: 'invalid', // TODO: 必要か？
} as const;
export type Step = (typeof Step)[keyof typeof Step];

/**
 * 状態定義
 */
export type State<ITEMS, FIELD extends string> = {
    step: Step;
    formData: FormData<FIELD>;
    items: ITEMS;
    page: number;
    violations: Violations<FIELD>;
    violationsMap: ViolationsMap<FIELD>;
};

/*
export type State<ITEMS, FIELD extends string> = Initial<FIELD> | Search<FIELD> | Ok<ITEMS>;

export type Initial<FIELD extends string> = {
    step: typeof Step.Initial;
    query: FormData<FIELD>;
};

export type Search<FIELD extends string> = {
    step: typeof Step.Search;
    query: FormData<FIELD>;
};

export type Ok<ITEMS> = {
    step: typeof Step.Ok;
    items: ITEMS;
    page: number;
};

export type Invalid<FIELD extends string> = {
    step: typeof Step.Invalid;
    query: FormData<FIELD>; //TODO: すべてのステートを一つにまとめるか
    violations: Violations<FIELD>;
    violationsMap: ViolationsMap<FIELD>;
};
*/

/**
 * アクション定義
 */
export const ActionType = {
    // ToInitial: 'toInitial',
    SetQuery: 'setQuery',
    ToSearch: 'toSearch',
    toOk: 'toOk',
    SetViolations: 'setViolations',
    Reset: 'reset',
} as const;
export type ActionType = (typeof ActionType)[keyof typeof ActionType];

// export type Action<T> = { type: 'setItems'; items: T; page: number } | { type: 'reset' };
export type Action<ITEMS, FIELD extends string = never> =
    // | { type: typeof ActionType.ToInitial; query: FormData<FIELD> }
    | { type: typeof ActionType.SetQuery; key: FIELD; value: string }
    | { type: typeof ActionType.ToSearch; query: FormData<FIELD> }
    | { type: typeof ActionType.toOk; items: ITEMS; page: number }
    | {
          type: typeof ActionType.SetViolations;
          violations: Violations<FIELD>;
          violationsMap: ViolationsMap<FIELD>;
      }
    | { type: typeof ActionType.Reset; initialState: State<ITEMS, FIELD> };

/**
 * 状態管理関数
 *
 * 現在の状態とアクションを受け取り、新しい状態を返す
 */
// NOTE: constを使って型注釈をつける場合、型パラメータは使えない
export function reducer<ITEMS, FIELD extends string>(
    state: State<ITEMS, FIELD>,
    action: Action<ITEMS, FIELD>,
): State<ITEMS, FIELD> {
    switch (action.type) {
        // case ActionType.ToInitial:
        // const initial = { ...state, step: Step.Initial, query: action.query };
        // return initial;
        case ActionType.SetQuery:
            return {
                ...state,
                violations: [],
                violationsMap: {},
                formData: { ...state.formData, [action.key]: action.value },
            };
        case ActionType.ToSearch:
            const search = { ...state, step: Step.Search, query: action.query };
            return search;
        case ActionType.toOk:
            const results = {
                ...state,
                step: Step.Ok,
                items: action.items,
                page: action.page,
            };
            return results;
        case ActionType.SetViolations:
            const invalid = {
                ...state,
                // step: Step.Invalid,
                violations: action.violations,
                violationsMap: action.violationsMap,
            };
            return invalid;
        case ActionType.Reset:
            return { ...action.initialState };
        default:
            return state;
    }
}

/**
 * 状態の更新：検索条件の設定
 */
export function setQuery<ITEMS, FIELD extends string>(
    dispatch: React.ActionDispatch<[action: Action<ITEMS, FIELD>]>,
    key: FIELD,
    value: string,
) {
    dispatch({ type: ActionType.SetQuery, key, value });
}

/**
 * 状態の更新：検索の実行
 */
// TODO: 型パラメータITEMS無くせないか
export function toSearch<ITEMS, FIELD extends string>(
    dispatch: React.ActionDispatch<[action: Action<ITEMS, FIELD>]>,
    query: FormData<FIELD>,
): void {
    console.log(`toSearch#query=${JSON.stringify(query)}`);
    const action: Action<ITEMS, FIELD> = { type: ActionType.ToSearch, query };
    dispatch(action);
}

/**
 * 状態の更新：検索結果のセット
 */
export function toOk<ITEMS, FIELD extends string>(
    dispatch: React.ActionDispatch<[action: Action<ITEMS, FIELD>]>,
    items: ITEMS,
    page: number,
): void {
    const action: Action<ITEMS, FIELD> = { type: ActionType.toOk, items, page };
    dispatch(action);
}

/**
 * 状態の更新：検索結果のリセット
 */
// TODO: 未使用。リセットボタンつけるか
// export function toInitial<ITEMS, FIELD extends string>(
// dispatch: React.ActionDispatch<[action: Action<ITEMS, FIELD>]>,
// query: FormData<FIELD>,
// ): void {
// const action: Action<ITEMS, FIELD> = { type: ActionType.ToInitial, query };
// dispatch(action);
// }
export function reset<ITEMS, FIELD extends string>(
    dispatch: React.ActionDispatch<[action: Action<ITEMS, FIELD>]>,
    initialState: State<ITEMS, FIELD>,
): void {
    const action: Action<ITEMS, FIELD> = { type: ActionType.Reset, initialState };
    dispatch(action);
}

/**
 * 状態の更新：バリデーションエラー
 */
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
