import 'server-only';

import { ok } from '@/presentation/(system)/bff/bff.result.factories';
import { BffResult } from '@/presentation/(system)/bff/bff.result.types';
import { send } from '@/presentation/users/mvvm/bff/users.client';
import { Users, UsersQuery } from '@/presentation/users/mvvm/models/users-types';

export async function execute(offset: number, limit: number, query: UsersQuery): Promise<BffResult<Users>> {
  const users = await send(offset, limit, query);
  return ok(users);
}
