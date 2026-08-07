import 'server-only';

import { NextRequest } from 'next/server';
import z from 'zod';

import { toMultiValuedMap } from '@/presentation/_system/types/search-params';

export const ParamsSchema = z.object({
    customerId: z.string(),
});
export type Params = z.infer<typeof ParamsSchema>;

export type RouteContext = {
    params: Params;
};

export type RouteParser = (req: NextRequest) => Promise<RouteContext>;

const zodParser: RouteParser = async (req) => {
    const searchParams = req.nextUrl.searchParams;
    const map = toMultiValuedMap(searchParams);
    const params = ParamsSchema.parse(map);
    return { params };
};

export const parse: RouteParser = zodParser;
