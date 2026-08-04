import 'server-only';

import { NextRequest } from 'next/server';
import z from 'zod';

import { toForm } from '@/presentation/_system/types/search-params';

export const ParamsSchema = z.object({
    offset: z.string(),
    limit: z.string(),
});
export type Params = z.infer<typeof ParamsSchema>;

export const BodySchema = z.object({
    keyword: z.string(),
});
export type Body = z.infer<typeof BodySchema>;

export type RouteContext = {
    params: Params;
    body: Body;
};

export type RouteParser = (req: NextRequest) => Promise<RouteContext>;

const zodParser: RouteParser = async (req) => {
    // クエリのパース
    const searchParams = req.nextUrl.searchParams;
    const form = toForm(searchParams);
    const params = ParamsSchema.parse(form);
    // ボディのパース
    const text = await req.text();
    const json = JSON.parse(text);
    const body = BodySchema.parse(json);

    return { params, body };
};

export const parse: RouteParser = zodParser;
