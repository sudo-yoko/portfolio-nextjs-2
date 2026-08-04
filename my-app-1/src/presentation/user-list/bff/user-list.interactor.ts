import 'server-only';

import { invalid, okData } from '@/presentation/_system/result/result.factories';
import { hasError } from '@/presentation/_system/validation/validation.helpers';
import { FormData } from '@/presentation/_system/validation/validation.types';
import { requestUsers } from '@/presentation/backend-lib/users/users.client';
import { FormKeys, UserListResult } from '@/presentation/user-list/models/user-list.types';
import { validate } from '@/presentation/user-list/models/user-list.validator';

export async function execute(
    offset: string,
    limit: string,
    formData: FormData<FormKeys>,
): Promise<UserListResult> {
    //
    // バリデーション
    //
    const violations = validate(formData);
    if (hasError(violations)) {
        return invalid(violations);
    }
    //
    // データ取得
    //
    const users = await requestUsers({ offset, limit, keyword: formData.keyword });
    return okData(users.users);
}
