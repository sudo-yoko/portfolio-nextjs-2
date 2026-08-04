import 'server-only';

import z from 'zod';

export const BodySchema = z.object({
    name: z.string(),
    email: z.string(),
    body: z.string(),
});
export type Body = z.infer<typeof BodySchema>;

// TODO: これは共通? -> ボディが無いルートもある
export type RouteContext = {
    body: Body;
};

// export type BodyParser<T> = (rawBody: string) => T;
export type RouteParser = (req: Request) => Promise<RouteContext>;

const zodParser: RouteParser = async (req) => {
    const text = await req.text();
    const json = JSON.parse(text);
    const body = BodySchema.parse(json);
    return { body };
};

const _typeAssertionParser: RouteParser = async (req) => {
    const text = await req.text();
    // TODO: 何が違うのか
    const body = JSON.parse(text) as Body;
    // const data: ContactBody = JSON.parse(text);

    return { body };
};

export const parse: RouteParser = zodParser;
