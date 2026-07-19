import 'client-only';

import client from '@/presentation/_system/client/client.c';
import { Method, RawResponse } from '@/presentation/_system/client/client.types';
import { parseResult } from '@/presentation/_system/result/result.helpers';
import { ErrTestResult } from '@/presentation/err-test/models/err-test.types';
import { BffResult } from '@/presentation/_system/result/result.types';

type Send = {
    (): Promise<BffResult<ErrTestResult>>;
};

const viaRoute: Send = async () => {
    const res: RawResponse = await client.send({
        url: '/api/bff/err-test',
        method: Method.GET,
    });
    const result = parseResult(res.rawBody); // TODO: レスポンスボディが無い時もこれが必要なのか？
    return result as ErrTestResult;
};

export const send: Send = viaRoute;
