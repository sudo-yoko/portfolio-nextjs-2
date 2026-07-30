import { Validator, Violation } from '@/presentation/_system/validation/validation.types';
import { validateEmail } from '@/presentation/_system/validation/validators.email';
import { validateMax, validateMin } from '@/presentation/_system/validation/validators.length';
import { required } from '@/presentation/_system/validation/validators.presence';

/**
 * 先頭から検証し、最初に見つかった違反だけを返す
 */
export function validateFirst(value: string, label: string) {
    return (validators: Validator[]) => {
        for (const validator of validators) {
            const violation = validator(value, label);
            if (violation.length > 0) {
                return violation;
            }
        }
        return [];
    };
}

/**
 * すべてのバリデーションを実行してエラーを集約する
 */
export function validateAll(value: string, label: string) {
    return (validators: Validator[]) => {
        let violations: Violation = [];
        for (const validator of validators) {
            const violation = validator(value, label);
            violations.push(...violation);
        }
        return violations;
    };
}

export const requiredEmail: Validator = (value, label) => {
    const violation = validateFirst(value, label)([required, validateEmail]);
    return violation;
};

/**
 * 必須かつ最大桁数チェック
 */
const requiredMax = (max: number): Validator => {
    return (value, label) => {
        const violation = validateFirst(value, label)([required, validateMax(max)]);
        return violation;
    };
};
export const requiredMax50 = requiredMax(50);

const requiredMin = (min: number): Validator => {
    return (value, label) => {
        return validateFirst(value, label)([required, validateMin(min)]);
    };
};
export const requiredMin5 = requiredMin(5);
