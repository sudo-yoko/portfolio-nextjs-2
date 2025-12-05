import 'server-only';

import { REJECTION_LABELS } from '@/presentation/(system)/bff/bff.result.constants';
import { ok, reject } from '@/presentation/(system)/bff/bff.result.factories';
import { BffResult } from '@/presentation/(system)/bff/bff.result.types';
import { FetchPageResult } from '@/presentation/(system)/pagination/mvvm/models/pagination.requester';
import { Violations } from '@/presentation/(system)/validation/validation.types';
import { send } from '@/presentation/users/mvvm/bff/users.client';
import { FormKeys, User, UsersQuery } from '@/presentation/users/mvvm/models/users.types';

export async function execute(
  offset: number,
  limit: number,
  query: UsersQuery,
): Promise<BffResult<FetchPageResult<User[]>, Violations<FormKeys>>> {  // TODO: REASON型を指定しないのにコンパイルエラーにならない
  const { total, users } = await send(offset, limit, query);

  const data: FetchPageResult<User[]> = { total, items: users };
  if (total === 0) {
    const violations: Violations<FormKeys> = {
      userName: ['該当データがありません。'],
    };
    return reject(REJECTION_LABELS.NO_DATA, violations);
  }
  return ok(data);
}
