import 'server-only';

import { NextRequest } from 'next/server';
import z from 'zod';

import { zodUtil } from '@/presentation/_system/io/deserialize.zod';
import { toMultiValuedMap } from '@/presentation/_system/types/search-params';

// export type Params = z.infer<typeof ParamsSchema>;
// export type Body = z.infer<typeof BodySchema>;

export type Params = {
    offset: string;
    limit: string;
};

export type Body = {
    keyword: string;
};

export type RouteContext = {
    params: Params;
    body: Body;
};

type RouteDeserializer = (req: NextRequest) => Promise<RouteContext>;

function withZod(): RouteDeserializer {
    const ParamsSchema: z.ZodType<Params> = z.object({
        offset: z.string(),
        limit: z.string(),
    });
    const BodySchema: z.ZodType<Body> = z.object({
        keyword: z.string(),
    });
    const deserializer: RouteDeserializer = async (req) => {
        // クエリ
        const searchParams = req.nextUrl.searchParams;
        const form = toMultiValuedMap(searchParams);
        const params = zodUtil.withErrorHandling(() => ParamsSchema.parse(form));
        // ボディ
        const text = await req.text();
        const json = JSON.parse(text);
        const body = zodUtil.withErrorHandling(() => BodySchema.parse(json));
        return { params, body };
    };
    return deserializer;
}

// const zodParser: RouteDeserializer = async (req) => {
//     const ParamsSchema: z.ZodType<Params> = z.object({
//         offset: z.string(),
//         limit: z.string(),
//     });

//     const BodySchema: z.ZodType<Body> = z.object({
//         keyword: z.string(),
//     });

//     // クエリのパース
//     const searchParams = req.nextUrl.searchParams;
//     const form = toForm(searchParams);
//     const params = ParamsSchema.parse(form);
//     // ボディのパース
//     const text = await req.text();
//     const json = JSON.parse(text);
//     const body = BodySchema.parse(json);

//     return { params, body };
// };

export const deserialize: RouteDeserializer = withZod();
