import 'server-only';

import { NextRequest } from 'next/server';

import { withAdviceAsync } from '@/presentation/_system/aspect/aspect.route-handler';
import logger from '@/presentation/_system/logging/logger.s';
import { execute } from '@/presentation/err-test/bff/err-test.interactor';

const logPrefix = 'err-test.route.ts: ';

export async function GET(req: NextRequest): Promise<Response> {
    return await withAdviceAsync(() => _());
    async function _() {
        const params = req.nextUrl.searchParams;
        const err = params.get('err') ?? undefined;
        logger.info(logPrefix + 'request -> err=' + err);
        return await execute(err);
    }
}
