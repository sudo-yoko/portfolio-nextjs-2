import { z } from 'zod';

import { Validator } from '@/presentation/_system/validation/validation.types';
import { isBlank } from '@/presentation/_system/validation/validators.presence';

/**
 * 任意かつ桁数上限チェック
 */
export const validateMax = (max: number): Validator => {
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

export const validateMin = (min: number): Validator => {
    const schema = z.string().min(min);
    return (value, label) => {
        if (isBlank(value)) {
            return [];
        }
        if (schema.safeParse(value).success) {
            return [];
        }
        return [`${label}は${min}文字以上にしてください。`];
    };
};

// /**
//  * 必須かつ最大桁数チェック
//  */
// const requiredMax = (max: number): Validator => {
//     return (value, label) => {
//         // バリデーション実行
//         const violation = validateFirst(
//             value,
//             label,
//         )([
//             // 必須チェック
//             required,
//             // 桁数チェック
//             validateMax(max),
//         ]);
//         return violation;
//     };
// };

// const requiredMin = (min: number): Validator => {
//     return (value, label) => {
//         return validateFirst(value, label)([required, validateMin(min)]);
//     };
// };

export const validateMax50 = validateMax(50);
export const validateMax100 = validateMax(100);
// export const validateMax150 = validateMax(150);
// export const requiredMax50 = requiredMax(50);
// export const requiredMin5 = requiredMin(5);
