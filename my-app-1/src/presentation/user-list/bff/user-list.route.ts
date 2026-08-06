import 'server-only';

import { NextRequest } from 'next/server';

import { withAdviceAsync } from '@/presentation/_system/aspect/aspect.route-handler';
import logger from '@/presentation/_system/logging/logger.s';
import { execute } from '@/presentation/user-list/bff/user-list.interactor';
import { parse } from '@/presentation/user-list/models/user-list.deserializer';

const logPrefix = 'user-list.route.ts: ';

export async function POST(req: NextRequest): Promise<Response> {
    return await withAdviceAsync(() => _());

    async function _() {
        const { params, body } = await parse(req);
        logger.info(logPrefix + `params=${JSON.stringify(params)}, body=${JSON.stringify(body)}`);
        return await execute(params.offset, params.limit, body);
    }
}
