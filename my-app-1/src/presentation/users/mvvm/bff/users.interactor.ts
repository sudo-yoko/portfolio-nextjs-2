import 'server-only';

import { FetchData } from '@/presentation/_system/pagination/mvvm/models/pagination.requester';
import { PaginationResult } from '@/presentation/_system/pagination/mvvm/models/pagination.types';
import { invalid, okData } from '@/presentation/_system/result/result.core.factories';
import { hasError } from '@/presentation/_system/validation/validation.helpers';
import { FormData } from '@/presentation/_system/validation/validation.types';
import { send } from '@/presentation/users/mvvm/bff/users.client';
import { FormKeys, User } from '@/presentation/users/mvvm/models/users.types';
import { validate } from '@/presentation/users/mvvm/models/users.validator';

export async function execute(
    offset: number,
    limit: number,
    query: FormData<FormKeys>,
    // TODO: REASON型を指定しないのにコンパイルエラーにならない
): Promise<PaginationResult<FetchData<User[]>, FormKeys>> {
    //
    // バリデーション
    //
    const violations = validate(query);
    if (hasError(violations)) {
        // return reject(REJECTION_LABELS.VIOLATION, violations);
        return invalid(violations);
    }

    // const query: UsersQuery = {
    // userName: formData.userName,
    // };
    //
    // データ取得
    //
    const { total, users } = await send(offset, limit, query);
    // if (total === 0) {
    // return reject(REJECTION_LABELS.NO_DATA);
    // }
    const data: FetchData<User[]> = { total, items: users };
    return okData(data);
}
