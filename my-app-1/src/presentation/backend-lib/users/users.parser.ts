// バックエンド（REST API）のレスポンスの検証とパース
import 'server-only';

import { Type } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import z from 'zod';

import { ResponseBodyParser } from '@/presentation/_system/client/response-parser';
import { tbSchema, tbUtil } from '@/presentation/_system/utils/typebox-utils';
import { zodUtil } from '@/presentation/_system/utils/zod-utils';

const logPrefix = 'users.parser.ts: ';

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

/**
 * Zodを使ったAPI通信のパース
 */
const zodParser: ResponseBodyParser<ResUsers> = (rawBody) => {
    const ResUserSchema: z.ZodType<ResUser> = z.object({
        userId: z.string(),
        userName: z.string(),
    });
    const ResUsersSchema: z.ZodType<ResUsers> = z.object({
        total: z.string(),
        users: z.array(ResUserSchema),
    });
    // TODO: zodだとリスト（配列）の全データを検証してエラーがあると全データがログに出力されて大量データの場合にログを圧迫する
    // API通信のパースについてはzod以外のライブラリにするか、zodのエラーを先頭に数件に絞ることを検討
    const json: unknown = JSON.parse(rawBody);
    return zodUtil.withErrorHandling(() => ResUsersSchema.parse(json));
};

/**
 * TypeBoxを使ったAPI通信のパース
 */
const tbParser: ResponseBodyParser<ResUsers> = (rawBody) => {
    const ResUserSchema = tbSchema(
        Type.Object({
            userId: Type.String(),
            userName: Type.String(),
        }),
    );
    const ResUsersSchema = tbSchema(
        Type.Object({
            total: Type.String(),
            users: Type.Array(ResUserSchema),
        }),
    );
    const json: unknown = JSON.parse(rawBody);
    return tbUtil.withErrorHandling(() => Value.Decode(ResUsersSchema, json));
    // if (!Value.Check(ResUsersSchema, json)) {
    //     const errors = [...Value.Errors(ResUsersSchema, json)];
    //     logger.error(logPrefix + 'API Response Validation Error:' + JSON.stringify(errors, null, 2));
    //     throw new Error('APIから返却されたデータの形式が不正です。');
    // }
};

const typeAssertionParser: ResponseBodyParser<ResUsers> = (rawBody) => {
    // TODO: 何が違うのか
    const data = JSON.parse(rawBody) as ResUsers;
    // const data: ResUsers = JSON.parse(rawData);

    return data;
};

export const parseUsers: ResponseBodyParser<ResUsers> = tbParser;
