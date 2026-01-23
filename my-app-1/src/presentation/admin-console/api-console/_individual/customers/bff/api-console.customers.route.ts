import 'server-only';

import { NextRequest } from 'next/server';

import { executeAsync } from '@/presentation/_system/aop/aop.feature.bff.route';
import logger from '@/presentation/_system/logging/logger.s';
import { FormData } from '@/presentation/_system/validation/validation.types';
import { execute } from '@/presentation/admin-console/api-console/_individual/customers/bff/api-console.customers.interactor';
import { FormKeys } from '@/presentation/admin-console/api-console/_individual/customers/models/api-console.customers.types';

const logPrefix = 'api-console.customers.route.ts: ';

// TODO: BFFの真髄は、「フロントエンドの都合に合わせてAPIを再定義する」こと。必ずしも呼び出すバックエンドAPIと同じURL構成を踏襲しなくても良いと考える
export async function GET(req: NextRequest): Promise<Response> {
    return executeAsync(() => func());

    async function func() {
        const params = req.nextUrl.searchParams;
        const formData = Object.fromEntries(params.entries()) as FormData<FormKeys>;
        logger.info(logPrefix + `query=${JSON.stringify(formData)}`);

        const result = await execute(formData);
        return result;
    }
}
