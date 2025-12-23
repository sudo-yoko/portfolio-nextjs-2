import 'server-only';

import { executeAsync } from '@/presentation/(system)/aop/aop.feature.bff.route';
import { FormData } from '@/presentation/(system)/validation/validation.types';
import { execute } from '@/presentation/users/min/modules/users.interactor';
import { FormKeys } from '@/presentation/users/min/modules/users.types';

interface ReqBody {
    offset: number;
    limit: number;
    // query: UsersQuery;
    query: FormData<FormKeys>;
}

export async function POST(req: Request): Promise<Response> {
    // return await withErrorHandlingAsync(() => withAuthAsync(() => func()));
    return await executeAsync(() => func());

    async function func() {
        // const reqBody: ReqBody = await req.json();
        // const { limit, offset, query } = reqBody;
        // const { total, users } = await send(offset, limit, query);
        // const result: FetchPageResult<User[]> = { total, items: users };
        // return bffResponse(okData(result));
        // return new Response(JSON.stringify(resBody), { status: 200 });

        const reqBody: ReqBody = await req.json();
        const { offset, limit, query } = reqBody;
        const result = await execute(offset, limit, query);
        // return resultResponse(result);
        return result;
    }
}
