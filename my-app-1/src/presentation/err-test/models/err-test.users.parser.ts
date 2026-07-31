// バックエンド（REST API）のレスポンスの検証とパース
import z from 'zod';

import { ResponseParser } from '@/presentation/_system/client/response-parser';

/**
 * バックエンドレスポンスのユーザー情報
 */
export type ResUser = {
    userId: string;
    userName: string;
};

/**
 * バックエンドレスポンスのユーザーリスト
 */
export type ResUsers = {
    total: string;
    users: ResUser[];
};

const ResUserSchema: z.ZodType<ResUser> = z.object({
    userId: z.string(),
    userName: z.string(),
});

const ResUsersSchema: z.ZodType<ResUsers> = z.object({
    total: z.string(),
    users: z.array(ResUserSchema),
});

const zodParser: ResponseParser<ResUsers> = (rawBody) => {
    const json: unknown = JSON.parse(rawBody);
    return ResUsersSchema.parse(json);
};

const typeAssertionParser: ResponseParser<ResUsers> = (rawBody) => {
    // TODO: 何が違うのか
    const data = JSON.parse(rawBody) as ResUsers;
    // const data: ResUsers = JSON.parse(rawData);

    return data;
};

export const parseResponse: ResponseParser<ResUsers> = zodParser;
