import { FormValidator, Validator, Violations } from '@/presentation/_system/validation/validation.types';
import { required, requiredAny } from '@/presentation/_system/validation/validators.presence';
import { FormKeys } from '@/presentation/admin-console/api-console/_individual/users/models/api-console.users.types';

export const validate: FormValidator<FormKeys> = (formData) => {
    const errors: Violations<FormKeys> = [];
    errors.push({
        field: FormKeys.offset,
        violation: validateOffset(formData.offset),
    });
    errors.push({
        field: FormKeys.limit,
        violation: validateLimit(formData.limit),
    });
    // TODO: 相関チェック検討
    errors.push({
        field: FormKeys.userId,
        violation: validateQuery(formData.userId, formData.userName),
    });
    errors.push({
        field: FormKeys.userName,
        violation: validateQuery(formData.userId, formData.userName),
    });
    return errors;
};

function validateOffset(offset: string) {
    let errors: string[] = [];
    errors = requiredNumber(offset, 'offset');

    const num = Number(offset);
    if (num <= 0 || num > 100) {
        errors.push(`offsetは1から100を入力してください。`);
    }
    return errors;
}

function validateLimit(limit: string) {
    let errors: string[] = [];
    errors = requiredNumber(limit, 'limit');
    return errors;
}

function validateQuery(userId: string, userName: string) {
    let errors: string[] = [];
    errors = requiredAny([userId, userName], ['ユーザーID', 'ユーザー名']);
    return errors;
}

const requiredNumber: Validator = (value, label) => {
    let errors: string[] = [];
    errors = required(value, label);
    if (errors.length > 0) {
        return errors;
    }
    const num = Number(value);
    if (isNaN(num)) {
        errors.push('数値を入力してください。');
        return errors;
    }
    return errors;
};
