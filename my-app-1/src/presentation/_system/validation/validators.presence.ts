//
// 入力有無検証バリデーター
//
import { Validator } from '@/presentation/_system/validation/validation.types';

// TODO: string | undefined | null の型を作る

/**
 * 入力有無の判定
 */
export const isBlank = (value: string | undefined | null): boolean => {
    return !value || value.trim() === '';
};

/**
 * 必須入力
 */
export const required: Validator = (value, label) => {
    const errors: string[] = [];
    // if (!value || value.trim() === '') {
    if (isBlank(value)) {
        errors.push(`${label}を入力してください。`);
    }
    return errors;
};

// TODO: インターフェース型を検討
export const requiredAny = (values: string[], labels: string[]): string[] => {
    const errors: string[] = [];
    const result = values.some((value) => value && value.trim() !== '');
    if (!result) {
        errors.push(`${labels.join(',')}のどれかを入力してください。`);
    }
    return errors;
};

/**
 * 入力禁止
 */
export const forbidden: Validator = (value, label) => {
    const errors: string[] = [];
    if (value) {
        errors.push(`${label}は入力できません。`);
    }
    return errors;
};

export const forbiddenAll = (values: string[], labels: string[]): string[] => {
    const errors: string[] = [];
    return errors;
};
