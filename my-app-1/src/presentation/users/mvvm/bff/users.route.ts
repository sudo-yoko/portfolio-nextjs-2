import 'server-only';

import { NextRequest } from 'next/server';

import { executeAsync } from '@/presentation/_system/aop/aop.feature.bff.route';
import { FormData } from '@/presentation/_system/validation/validation.types';
import { execute } from '@/presentation/users/mvvm/bff/users.interactor';
import { FormKeys } from '@/presentation/users/mvvm/models/users.types';

export async function POST(req: NextRequest): Promise<Response> {
    // TODO: 引数がNestResponse、戻りがResponse(NextResponseではない)でも問題ないか
    return await executeAsync(() => func());

    async function func() {
        // クエリ文字列を取得
        const params = req.nextUrl.searchParams;

        // const query = Object.fromEntries(params.entries()) as UsersQuery; // TODO: クエリ文字列が付いていない場合のチェックを検討
        // const { offset, limit } = query;
        const offset = params.get('offset');
        if (!offset) {
            throw Error();
        }
        const limit = params.get('limit');
        if (!limit) {
            throw Error();
        }

        // リクエストボディを取得
        const body: FormData<FormKeys> = await req.json();
        if (!body) {
            throw Error();
        }
        if (!body.keyword) {
            throw Error();
        }

        //
        return await execute(offset, limit, body);
    }
}
