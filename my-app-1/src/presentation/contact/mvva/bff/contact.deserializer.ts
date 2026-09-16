//
// デシリアライザ
// Schema-First（スキーマからの型抽出）設計
//
import 'server-only';

import z from 'zod';

import { zodUtil } from '@/presentation/_system/io/deserialize.zod';

const RouteBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    zipcode: z.string(), // NOTE: optional()にはしない。未設定の場合は空文字にする
    address1: z.string(),
    address2: z.string(),
    body: z.string(),
});

// export type BodyParser<T> = (rawBody: string) => T;
// export type RouteDeserializer = (req: Request) => Promise<RouteContext>;
export async function deserialize(req: Request): Promise<RouteContext> {
    // const text = await req.text();
    // const json = JSON.parse(text);
    const json = await req.json();
    const body = zodUtil.withErrorHandling(() => RouteBodySchema.parse(json));
    return { body };
}

// const _withTypeAssertion: RouteDeserializer = async (req) => {
//     const text = await req.text();
//     // TODO: 何が違うのか
//     const body = JSON.parse(text) as ContactBody;
//     // const data: ContactBody = JSON.parse(text);

//     return { body };
// };

// export const deserialize: RouteDeserializer = withZod();

export type RouteBody = z.infer<typeof RouteBodySchema>;

/**
 * Route Handlerで受け取る値
 */
export type RouteContext = {
    body: RouteBody;
};
