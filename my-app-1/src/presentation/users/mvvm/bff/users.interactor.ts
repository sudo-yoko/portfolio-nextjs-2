import 'server-only';

import { BffResult } from '@/presentation/(system)/result/result.bff.types';
import { FetchPageResult } from '@/presentation/(system)/pagination/mvvm/models/pagination.requester';
import { invalid, okData } from '@/presentation/(system)/result/result.core.factories';
import { hasError } from '@/presentation/(system)/validation/validation.helper';
import { FormData } from '@/presentation/(system)/validation/validation.types';
import { send } from '@/presentation/users/mvvm/bff/users.client';
import { FormKeys, User } from '@/presentation/users/mvvm/models/users.types';
import { validate } from '@/presentation/users/mvvm/models/users.validator';

export async function execute(
  offset: number,
  limit: number,
  query: FormData<FormKeys>,
  // TODO: REASON型を指定しないのにコンパイルエラーにならない
): Promise<BffResult<FetchPageResult<User[]>, FormKeys>> {
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
  const data: FetchPageResult<User[]> = { total, items: users };
  return okData(data);
}
