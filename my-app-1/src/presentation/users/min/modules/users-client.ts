import 'server-only';

import client from '@/presentation/(system)/client/client.s';
import { Method } from '@/presentation/(system)/client/client.types';
import { env } from '@/presentation/(system)/env/env-validated.s';
import { withErrorHandlingAsync } from '@/presentation/(system)/errors/error-handler.server';
import logger from '@/presentation/(system)/logging/logger.s';
import { Users, UsersQuery } from '@/presentation/users/min/modules/users-types';

const logPrefix = 'users-client.ts: ';

export async function send(offset: number, limit: number, query: UsersQuery): Promise<Users> {
  return withErrorHandlingAsync(() => func());

  async function func(): Promise<Users> {
    const url = env('USERS_API');

    const result = await client.send({
      url,
      method: Method.GET,
      params: { offset, limit, ...query },
    });
    logger.info(logPrefix + 'result=' + JSON.stringify(result));

    const users: Users = JSON.parse(result.rawBody);
    return {
      total: users.total,
      users: users.users,
    };
  }
}
