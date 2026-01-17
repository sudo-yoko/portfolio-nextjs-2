//
// お問い合わせフォーム カスタムフックと関連するイベントハンドラー
//
'use client';

import { executeAsync } from '@/presentation/_system/aop/aop.feature.client';
import { backendError, malformedResultError } from '@/presentation/_system/error/error.factories';
import {
    isAborted,
    isInvalid,
    isOkEmpty,
    isRetryable,
} from '@/presentation/_system/result/result.core.helpers';
import { hasError } from '@/presentation/_system/validation/validation.helpers';
import { Violations } from '@/presentation/_system/validation/validation.types';
import { send } from '@/presentation/contact/small/models/contact.requester';
import { FormKeys } from '@/presentation/contact/small/models/contact.types';
import { validate } from '@/presentation/contact/small/models/contact.validator';
import {
    Action,
    initialState,
    reducer,
    setAbort,
    setRetryMsg,
    setViolations,
    State,
    Step,
    toComplete,
    toConfirm,
    toInput,
} from '@/presentation/contact/small/view-models/contact.reducer';
import { useEffect, useReducer } from 'react';

/**
 * お問い合わせフォーム カスタムフック
 */
export function useContact() {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        void (async () => {
            if (state.step === Step.Send) {
                await submit(state, dispatch, () => setAbort(dispatch));
            }
        })();
    }, [state]);

    useEffect(() => {
        // バリデーションエラーが取得されている場合にUIに反映する。(サーバーサイドバリデーションで戻された時)
        if (state.violations && hasError(state.violations)) {
            setViolations(dispatch, state.violations);
        }
    }, [dispatch, state.violations]);

    return { state, dispatch };
}

/**
 * 次へボタンを押したときの処理
 */
export function handleNext(state: State, dispatch: React.ActionDispatch<[action: Action]>) {
    // バリデーション
    ((violations: Violations<FormKeys>) => {
        if (hasError(violations)) {
            setViolations(dispatch, violations);
            return;
        }
        setViolations(dispatch, []);
        toConfirm(dispatch);
    })(validate(state.formData));
}

/**
 * 送信中が表示中の処理
 */
export async function submit(
    state: State,
    dispatch: React.ActionDispatch<[action: Action]>,
    onAbort: () => void,
) {
    // エラーハンドリングを追加して処理を実行する。
    await executeAsync(() => func(), onAbort);

    async function func() {
        // バックエンド呼び出し
        const result = await send(state.formData);
        // 異常
        if (isAborted(result)) {
            throw backendError(result);
        }
        // 正常
        if (isOkEmpty(result)) {
            toComplete(dispatch);
            return;
        }
        // バリデーションエラーあり
        if (isInvalid(result)) {
            const violations = result.violations;
            if (hasError(violations)) {
                setViolations(dispatch, violations);
                toInput(dispatch);
                return;
            }
        }
        // 再試行可能なエラー
        if (isRetryable(result)) {
            if (state.retryableCount >= 3) {
                setAbort(dispatch);
                return;
            }
            setRetryMsg(dispatch, result.retryMsg);
            // toInput(dispatch);
            return;
        }
        // RESULTの形式が不正
        throw malformedResultError(result);
    }
}

/**
 * リトライメッセージを閉じる
 */
export function dismissRetryMsg(dispatch: React.ActionDispatch<[action: Action]>) {
    setRetryMsg(dispatch, []);
    // toInput(dispatch);
}
