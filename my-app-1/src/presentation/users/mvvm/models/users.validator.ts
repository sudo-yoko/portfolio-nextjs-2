//
// クライアントサイド／サーバーサイド 共通バリデーション
//
import { FormValidator, Violations } from '@/presentation/_system/validation/validation.types';
import { required } from '@/presentation/_system/validation/validators.presence';
import { FormKeys } from '@/presentation/users/mvvm/models/users.types';

export const validate: FormValidator<FormKeys> = (formData) => {
    const errors: Violations<FormKeys> = [];
    errors.push({
        field: FormKeys.userName,
        violation: validateUserName(formData.userName),
    });
    return errors;
};

function validateUserName(userName: string) {
    return required(userName, '検索条件');
}
