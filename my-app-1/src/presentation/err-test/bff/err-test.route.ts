import 'server-only';

import { NextRequest } from 'next/server';

import { withAdviceAsync } from '@/presentation/_system/aspect/aspect.route-handler';
import logger from '@/presentation/_system/logging/logger.s';
import { execute } from '@/presentation/err-test/bff/err-test.interactor';
import { deserialize } from '@/presentation/err-test/models/err-test.deserializer';

const logPrefix = 'err-test.route.ts: ';

export async function GET(req: NextRequest): Promise<Response> {
    return await withAdviceAsync(() => _());
    async function _() {
        // const params = req.nextUrl.searchParams;
        // const err = params.get('err') ?? undefined;
        const { params } = deserialize(req);
        logger.info(logPrefix + 'request -> err=' + params.err);
        return await execute(params.err);
    }
}
