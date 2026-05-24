import 'server-only';

import { NextRequest } from 'next/server';

import { executeAsync } from '@/presentation/_system/aop/aop.route-boundary';
import { applicationError } from '@/presentation/_system/error/error.factories';
import { FormData } from '@/presentation/_system/validation/validation.types';
import { execute } from '@/presentation/users/standard/bff/users.interactor';
import { FormKeys } from '@/presentation/users/standard/models/users.types';

export async function POST(req: NextRequest): Promise<Response> {
    // TODO: 引数がNestResponse、戻りがResponse(NextResponseではない)でも問題ないか
    return await executeAsync(() => func());

    async function func() {
        const location = 'users.route.ts#func';

        // クエリ文字列を取得
        const params = req.nextUrl.searchParams;

        // const query = Object.fromEntries(params.entries()) as UsersQuery; // TODO: クエリ文字列が付いていない場合のチェックを検討
        // const { offset, limit } = query;
        const offset = params.get('offset');
        if (!offset) {
            throw applicationError({ location, message: 'クエリパラメータがありません。[offset]' });
        }
        const limit = params.get('limit');
        if (!limit) {
            throw applicationError({ location, message: 'クエリパラメータがありません。[limit]' });
        }

        // リクエストボディを取得
        const body: FormData<FormKeys> = await req.json();
        if (!body) {
            throw applicationError({ location, message: 'リクエストボディがありません。' });
        }
        if (!body.keyword) {
            throw applicationError({ location, message: 'リクエストボディがありません。[keyword]' });
        }
        //
        return await execute(offset, limit, body);
    }
}
