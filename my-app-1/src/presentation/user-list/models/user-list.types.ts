import { Invalid, OkData } from '@/presentation/_system/result/result.types';
import { User } from '@/presentation/backend-lib/users/users.types';

export const FormKeys = {
    keyword: 'keyword',
} as const;
export type FormKeys = (typeof FormKeys)[keyof typeof FormKeys];

export type UserListResult = OkData<User[]> | Invalid<FormKeys>;
