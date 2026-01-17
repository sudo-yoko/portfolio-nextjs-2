import { FormValidator, Validator, Violations } from '@/presentation/_system/validation/validation.types';
import { requiredEmail } from '@/presentation/_system/validation/validators.email';
import { required } from '@/presentation/_system/validation/validators.presence';
import { FormKeys } from '@/presentation/contact/small/models/contact.types';
import { z } from 'zod';

/**
 * フォームのバリデーション
 */
export const validate: FormValidator<FormKeys> = (formData) => {
    const errors: Violations<FormKeys> = [];
    errors.push({
        field: FormKeys.name,
        violation: validateName(formData.name),
    });
    errors.push({
        field: FormKeys.email,
        violation: validateEmail(formData.email),
    });
    errors.push({
        field: FormKeys.body,
        violation: validateBody(formData.body),
    });
    // errors['name'] = required(formData.name, 'お名前');
    // errors['email'] = requiredEmail(formData.email, 'メールアドレス');
    // errors['body'] = requiredMax50(formData.body, 'お問い合わせ内容');
    return errors;
};

function validateName(name: string) {
    return required(name, 'お名前');
}

function validateEmail(email: string) {
    return requiredEmail(email, 'メールアドレス');
}

function validateBody(body: string) {
    return requiredMax50(body, 'お問い合わせ内容');
}

/**
 * バリデーション：必須で最大５０桁まで
 */
const requiredMax50: Validator = (value, label) => {
    let errors: string[] = [];
    // 必須チェック
    errors = required(value, label);
    if (errors.length > 0) {
        return errors;
    }
    // 桁数チェック
    const result = z.string().max(50, `${label}は50文字以内にしてください。`).safeParse(value);
    if (result.error) {
        errors = result.error.issues.map((issue) => issue.message);
        return errors;
    }
    return errors;
};
