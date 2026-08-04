import 'server-only';

import { NextRequest } from 'next/server';

import { withAdviceAsync } from '@/presentation/_system/aspect/aspect.route-handler';
import logger from '@/presentation/_system/logging/logger.s';
import { execute } from '@/presentation/admin-console/api-console/_individual/customers/bff/api-console.customers.interactor';
import { parse } from '@/presentation/admin-console/api-console/_individual/customers/bff/api-console.customers.route.parser';

const logPrefix = 'api-console.customers.route.ts: ';

// TODO: BFFの真髄は、「フロントエンドの都合に合わせてAPIを再定義する」こと。必ずしも呼び出すバックエンドAPIと同じURL構成を踏襲しなくても良いと考える
export async function GET(req: NextRequest): Promise<Response> {
    return await withAdviceAsync(() => _());

    async function _() {
        // TODO: パースの設計を再検討
        // const params = req.nextUrl.searchParams;
        // const formData = Object.fromEntries(params.entries()) as FormData<FormKeys>;
        const { params } = await parse(req);
        logger.info(logPrefix + `query=${JSON.stringify(params)}`);

        // TODO: RouteContext型を引数のFormData<FormKeys>型にセットしているが問題ないか
        const result = await execute(params);
        return result;
    }
}
