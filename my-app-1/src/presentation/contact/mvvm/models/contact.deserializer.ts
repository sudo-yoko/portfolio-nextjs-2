import 'server-only';

import z from 'zod';

import { zodUtil } from '@/presentation/_system/io/deserialize.zod';
import { ContactBody, RouteContext } from '@/presentation/contact/mvvm/models/contact.types';

// export type Body = z.infer<typeof BodySchema>;

// export type BodyParser<T> = (rawBody: string) => T;
export type RouteDeserializer = (req: Request) => Promise<RouteContext>;

function withZod(): RouteDeserializer {
    const BodySchema: z.ZodType<ContactBody> = z.object({
        name: z.string(),
        email: z.string(),
        body: z.string(),
    });
    const deserializer: RouteDeserializer = async (req) => {
        const text = await req.text();
        const json = JSON.parse(text);
        const body = zodUtil.withErrorHandling(() => BodySchema.parse(json));
        return { body };
    };
    return deserializer;
}

const _withTypeAssertion: RouteDeserializer = async (req) => {
    const text = await req.text();
    // TODO: 何が違うのか
    const body = JSON.parse(text) as ContactBody;
    // const data: ContactBody = JSON.parse(text);

    return { body };
};

export const deserialize: RouteDeserializer = withZod();
