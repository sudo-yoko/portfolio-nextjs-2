import 'server-only'

import { withErrorHandlingAsync } from '@/presentation/(system)/errors/error-handler.bff.route';
import { execute } from '@/presentation/users/mvvm/bff/users.interactor';
import { UsersQuery } from '@/presentation/users/mvvm/models/users.types';
import { bffRouteResponse } from '@/presentation/(system)/bff/bff.result.factories.s';

interface ReqBody {
  offset: number;
  limit: number;
  query: UsersQuery;
}

export async function POST(req: Request): Promise<Response> {
  return await withErrorHandlingAsync(() => func());

  async function func() {
    const reqBody: ReqBody = await req.json();
    const { offset, limit, query } = reqBody;
    const result = await execute(offset, limit, query);
    return bffRouteResponse(result)
  }
}
