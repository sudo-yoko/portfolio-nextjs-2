import 'server-only';

import { Type } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import { NextRequest } from 'next/server';

import { tbSchema, tbUtil } from '@/presentation/_system/io/deserialize.typebox';
import { toMultiValuedMap } from '@/presentation/_system/types/search-params';

export type Params = {
    err?: string;
};

export type RouteContext = {
    params: Params;
};

type RouteDeserializer = (req: NextRequest) => RouteContext;

function withTypeBox(): RouteDeserializer {
    const ParamsSchema = tbSchema(
        Type.Object({
            err: Type.String(),
        }),
    );
    const deserializer: RouteDeserializer = (req) => {
        const searchParams = req.nextUrl.searchParams;
        const form = toMultiValuedMap(searchParams);
        const params = tbUtil.withErrorHandling(() => Value.Decode(ParamsSchema, form));
        return { params };
    };
    return deserializer;
}

export const deserialize: RouteDeserializer = withTypeBox();
