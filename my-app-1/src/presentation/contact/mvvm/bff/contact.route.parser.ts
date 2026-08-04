import 'server-only';

import z from 'zod';

// export type Body = {
//     name: string;
//     email: string;
//     body: string;
// };

export const BodySchema = z.object({
    name: z.string(),
    email: z.string(),
    body: z.string(),
});

export type Body = z.infer<typeof BodySchema>;

// export type BodyParser<T> = (rawBody: string) => T;
export type RouteParser<T> = (req: Request) => Promise<{ body: T }>;

const zodParser: RouteParser<Body> = async (req) => {
    const text = await req.text();
    const json = JSON.parse(text);
    const body = BodySchema.parse(json);
    return { body };
};

const _typeAssertionParser: RouteParser<Body> = async (req) => {
    const text = await req.text();
    // TODO: 何が違うのか
    const body = JSON.parse(text) as Body;
    // const data: ContactBody = JSON.parse(text);

    return { body };
};

export const parse: RouteParser<Body> = zodParser;
