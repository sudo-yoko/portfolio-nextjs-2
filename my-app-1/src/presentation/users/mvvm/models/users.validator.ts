//
// クライアントサイド／サーバーサイド 共通バリデーション
//
import { FormValidator, Violations } from '@/presentation/(system)/validation/validation.types';
import { required } from '@/presentation/(system)/validation/validators.presence';
import { FormKeys } from '@/presentation/users/mvvm/models/users.types';

export const validate: FormValidator<FormKeys> = (formData) => {
  const errors: Violations<FormKeys> = {};
  errors[FormKeys.userName] = required(formData.userName, '検索条件');
  return errors;
};
