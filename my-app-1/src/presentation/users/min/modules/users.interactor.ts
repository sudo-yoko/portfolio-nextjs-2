import 'server-only';

import { FetchData } from '@/presentation/(system)/pagination/min/modules/pagination.requester';
import { PaginationResult } from '@/presentation/(system)/pagination/min/modules/pagination.types';
import { invalid, okData } from '@/presentation/(system)/result/result.core.factories';
import { hasError } from '@/presentation/(system)/validation/validation.helpers';
import { FormData } from '@/presentation/(system)/validation/validation.types';
import { send } from '@/presentation/users/min/modules/users.client';
import { FormKeys, User } from '@/presentation/users/min/modules/users.types';
import { validate } from '@/presentation/users/min/modules/users.validator';

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
