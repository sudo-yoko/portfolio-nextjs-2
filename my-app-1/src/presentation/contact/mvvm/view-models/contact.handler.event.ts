//
// お問い合わせフォーム イベントハンドラー
//
'use client';

import { executeAsync } from '@/presentation/(system)/aop/aop.feature.client';
import { bffError } from '@/presentation/(system)/error/error.factories';
import { isInvalid, isOkEmpty } from '@/presentation/(system)/result/result.core.helpers';
import { hasError } from '@/presentation/(system)/validation/validation.helpers';
import { Violations } from '@/presentation/(system)/validation/validation.types';
import { send } from '@/presentation/contact/mvvm/models/contact.requester';
import { FormKeys } from '@/presentation/contact/mvvm/models/contact.types';
import { validate } from '@/presentation/contact/mvvm/models/contact.validator';
import {
  Action,
  setViolations,
  State,
  toComplete,
  toConfirm,
  toInput,
} from '@/presentation/contact/mvvm/view-models/contact.reducer';

/**
 * バリデーションエラーが取得されている場合にUIに反映する。
 */
export const applyViolations = (
  violations: Violations<FormKeys>,
  dispatch: React.ActionDispatch<[action: Action]>,
) => {
  if (violations && hasError(violations)) {
    setViolations(dispatch, violations);
  }
};

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
    toConfirm(dispatch);
  })(validate(state.formData));
}

/**
 * 送信中が表示中の処理
 */
export async function submit(
  state: State,
  dispatch: React.ActionDispatch<[action: Action]>,
  setError: React.Dispatch<React.SetStateAction<boolean>>,
) {
  // エラーハンドリングを追加して処理を実行する。
  await executeAsync(() => func(), setError);

  async function func() {
    const result = await send(state.formData);
    // 正常
    if (isOkEmpty(result)) {
      toComplete(dispatch);
      return;
    }
    // バリデーションエラーあり
    if (isInvalid(result)) {
      // if (isReject(result) && result.label === REJECTION_LABELS.VIOLATION) {
      const violations = result.violations;
      if (hasError(violations)) {
        setViolations(dispatch, violations);
        toInput(dispatch);
        return;
      }
    }
    // Aborted やその他想定外の返却値の場合
    throw bffError(result);
  }
}
