//
// メールアドレスのバリデーター
//
import { z } from 'zod';

import { validateFirst } from '@/presentation/_system/validation/validation.helpers';
import { Validator } from '@/presentation/_system/validation/validation.types';
import { isBlank, required } from '@/presentation/_system/validation/validators.presence';

/**
 * 必須のメールアドレス
 */
export const requiredEmail: Validator = (value, label) => {
    // バリデーション実行
    const violation = validateFirst([
        // 必須チェック
        () => required(value, label),
        // 形式チェック
        () => validateEmail(value, label),
    ]);
    return violation;
    // const errors: string[] = [];
    // // 必須チェック
    // errors.push(...required(value, label));
    // if (errors.length > 0) {
    //     return errors;
    // }
    // // 形式チェック
    // errors.push(...validateEmail(value, label));
    // if (errors.length > 0) {
    //     return errors;
    // }
    // return errors;
};

/**
 * メールアドレスの形式チェック
 */
export const validateEmail: Validator = (value, label) => {
    // 未入力の場合はチェックしない
    if (isBlank(value)) {
        return [];
    }
    const result = z.email(`${label}の形式が不正です。`).safeParse(value);
    return result.success ? [] : result.error.issues.map((issue) => issue.message);
};
