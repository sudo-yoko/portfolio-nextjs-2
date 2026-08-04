// TODO: 作成中。Route HandlerでリクエストボディなどをパースするwithXXXXX

import 'server-only';

import { RESULT } from '@/presentation/_system/result/result.types';

type RouteContext<T> = {
    body?: T;
};

export async function withBodyParser<BODY>(
    parser: () => Promise<RouteContext<BODY>>,
    subject: (context: RouteContext<BODY>) => Promise<RESULT>,
): Promise<RESULT> {
    const body = await parser();
    // const text = await req.text();
    // const json = JSON.parse(text);
    // const body = schema.parse(json) as BODY;

    const newContext: RouteContext<BODY> = {
        body: body.body,
    };
    return await subject(newContext);
}
