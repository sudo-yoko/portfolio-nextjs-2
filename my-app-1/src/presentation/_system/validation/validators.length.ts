import { z } from 'zod';

import { validateFirst } from '@/presentation/_system/validation/validation.helpers';
import { Validator } from '@/presentation/_system/validation/validation.types';
import { isBlank, required } from '@/presentation/_system/validation/validators.presence';

/**
 * 任意かつ桁数上限チェック
 */
const validateMax = (max: number): Validator => {
    const schema = z.string().max(max);
    return (value, label) => {
        // 未入力の場合はチェックしない
        if (isBlank(value)) {
            return [];
        }
        // 桁数上限チェック
        if (schema.safeParse(value).success) {
            return [];
        }
        return [`${label}は${max}文字以内にしてください。`];
    };
};

/**
 * 必須かつ最大桁数チェック
 */
const requiredMax = (max: number): Validator => {
    return (value, label) => {
        // バリデーション実行
        const violation = validateFirst([
            // 必須チェック
            () => required(value, label),
            // 桁数チェック
            () => validateMax(max)(value, label),
        ]);
        return violation;
    };
};

// export const validateMax50 = validateMax(50);
// export const validateMax100 = validateMax(100);
// export const validateMax150 = validateMax(150);
export const requiredMax50 = requiredMax(50);
