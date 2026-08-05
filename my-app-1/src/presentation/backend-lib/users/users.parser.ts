// バックエンド（REST API）のレスポンスの検証とパース
import z from 'zod';

import { ResponseBodyParser } from '@/presentation/_system/client/response-parser';

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

const zodParser: ResponseBodyParser<ResUsers> = (rawBody) => {
    // TODO: zodだとリスト（配列）の全データを検証してエラーがあると全データがログに出力されて大量データの場合にログを圧迫する
    // API通信のパースについてはzod以外のライブラリにするか、zodのエラーを先頭に数件に絞ることを検討
    const json: unknown = JSON.parse(rawBody);
    return ResUsersSchema.parse(json);
};

const typeAssertionParser: ResponseBodyParser<ResUsers> = (rawBody) => {
    // TODO: 何が違うのか
    const data = JSON.parse(rawBody) as ResUsers;
    // const data: ResUsers = JSON.parse(rawData);

    return data;
};

export const parseUsers: ResponseBodyParser<ResUsers> = zodParser;
