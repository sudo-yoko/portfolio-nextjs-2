import 'server-only';

import { NextRequest } from 'next/server';

import { withAdviceAsync } from '@/presentation/_system/aspect/aspect.route-handler';
import logger from '@/presentation/_system/logging/logger.s';
import { execute } from '@/presentation/user-list/bff/user-list.interactor';
import { parse } from '@/presentation/user-list/models/user-list.parser';

const logPrefix = 'user-list.route.ts: ';

export async function POST(req: NextRequest): Promise<Response> {
    return await withAdviceAsync(() => _());

    async function _() {
        const { params, body } = await parse(req);
        logger.info(logPrefix + `params=${JSON.stringify(params)}, body=${JSON.stringify(body)}`);
        return await execute(params.offset, params.limit, body);

        // const location = 'users.route.ts#func';

        // // クエリ文字列を取得
        // const params = req.nextUrl.searchParams;

        // // const query = Object.fromEntries(params.entries()) as UsersQuery; // TODO: クエリ文字列が付いていない場合のチェックを検討
        // // const { offset, limit } = query;
        // const offset = params.get('offset');
        // if (!offset) {
        //     throw applicationError({ location, message: 'クエリパラメータがありません。[offset]' });
        // }
        // const limit = params.get('limit');
        // if (!limit) {
        //     throw applicationError({ location, message: 'クエリパラメータがありません。[limit]' });
        // }

        // // リクエストボディを取得
        // const body: FormData<FormKeys> = await req.json();
        // if (!body) {
        //     throw applicationError({ location, message: 'リクエストボディがありません。' });
        // }
        // if (!body.keyword) {
        //     throw applicationError({ location, message: 'リクエストボディがありません。[keyword]' });
        // }
        // //
        // return await execute(offset, limit, body);
    }
}
