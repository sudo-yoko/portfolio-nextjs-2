import 'server-only';

import { REJECTION_LABELS } from '@/presentation/(system)/bff/bff.result.constants';
import { ok, reject } from '@/presentation/(system)/bff/bff.result.factories';
import { BffResult } from '@/presentation/(system)/bff/bff.result.types';
import { FetchPageResult } from '@/presentation/(system)/pagination/mvvm/models/pagination.requester';
import { send } from '@/presentation/users/mvvm/bff/users.client';
import { User, UsersQuery } from '@/presentation/users/mvvm/models/users.types';

export async function execute(
  offset: number,
  limit: number,
  query: UsersQuery,
): Promise<BffResult<FetchPageResult<User[]>>> {
  const { total, users } = await send(offset, limit, query);

  const data: FetchPageResult<User[]> = { total, items: users };
  if (total === 0) {
    return reject(REJECTION_LABELS.NO_DATA, data);
  }
  return ok(data);
}
