import 'server-only';

import { bffRouteResponse } from '@/presentation/(system)/result/result.bff.factories.s';
import { withErrorHandlingAsync } from '@/presentation/(system)/errors/error.handler.bff.route';
import { FormData } from '@/presentation/(system)/validation/validation.types';
import { execute } from '@/presentation/users/mvvm/bff/users.interactor';
import { FormKeys } from '@/presentation/users/mvvm/models/users.types';

interface ReqBody {
  offset: number;
  limit: number;
  // query: UsersQuery;
  query: FormData<FormKeys>;
}

export async function POST(req: Request): Promise<Response> {
  return await withErrorHandlingAsync(() => func());

  async function func() {
    const reqBody: ReqBody = await req.json();
    const { offset, limit, query } = reqBody;
    const result = await execute(offset, limit, query);
    return bffRouteResponse(result);
  }
}
