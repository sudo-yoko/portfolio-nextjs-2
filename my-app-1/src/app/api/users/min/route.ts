import 'server-only';

import { withAuthAsync } from '@/presentation/(system)/auth/auth-handler';
import { withErrorHandlingAsync } from '@/presentation/(system)/errors/error.handler.bff.route';
import { FetchPageResult } from '@/presentation/(system)/pagination/min/modules/pagination.requester';
import { bffRouteResponse } from '@/presentation/(system)/result/result.bff.factories.s';
import { okData } from '@/presentation/(system)/result/result.core.factories';
import { send } from '@/presentation/users/min/modules/users.client';
import { User, UsersQuery } from '@/presentation/users/min/modules/users.types';

interface ReqBody {
  offset: number;
  limit: number;
  query: UsersQuery;
}

export async function POST(req: Request): Promise<Response> {
  return await withErrorHandlingAsync(() => withAuthAsync(() => func()));

  async function func() {
    const reqBody: ReqBody = await req.json();
    const { limit, offset, query } = reqBody;
    const { total, users } = await send(offset, limit, query);
    const result: FetchPageResult<User[]> = { total, items: users };
    return bffRouteResponse(okData(result));
    // return new Response(JSON.stringify(resBody), { status: 200 });
  }
}
