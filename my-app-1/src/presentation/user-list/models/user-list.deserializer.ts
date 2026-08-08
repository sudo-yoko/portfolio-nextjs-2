import 'server-only';

import { Type } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import { NextRequest } from 'next/server';
import z from 'zod';

import { tbSchema, tbUtil } from '@/presentation/_system/io/deserialize.typebox';
import { zodUtil } from '@/presentation/_system/io/deserialize.zod';
import { toMultiValuedMap } from '@/presentation/_system/types/search-params';

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

function withTypeBox(): RouteDeserializer {
    const ParamSchema = tbSchema(
        Type.Object({
            offset: Type.String(),
            limit: Type.String(),
        }),
    );
    const BodySchema = tbSchema(
        Type.Object({
            keyword: Type.String(),
        }),
    );
    const deserializer: RouteDeserializer = async (req) => {
        // クエリ
        const searchParams = req.nextUrl.searchParams;
        const form = toMultiValuedMap(searchParams);
        const params = tbUtil.withErrorHandling(() => Value.Decode(ParamSchema, form));
        // ボディ
        const text = await req.text();
        const json = JSON.parse(text);
        const body = tbUtil.withErrorHandling(() => Value.Decode(BodySchema, json));
        return { params, body };
    };
    return deserializer;
}

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

export const deserialize: RouteDeserializer = withTypeBox();
