import 'server-only';

import { TSchema } from '@sinclair/typebox';
import { TransformDecodeCheckError } from '@sinclair/typebox/value';

import { applicationError } from '@/presentation/_system/error/error.factories';

export function tbSchema<T>(schema: TSchema & { static: T }): typeof schema {
    return schema;
}

export const tbUtil = {
    /**
     * TypeBox固有のエラーハンドリングを追加する
     */
    withErrorHandling: <T>(subject: () => T): T => {
        try {
            return subject();
        } catch (error) {
            handleError(error);
            throw error;
        }
    },
};

const handleError = (error: unknown) => {
    if (error instanceof TransformDecodeCheckError) {
        throw applicationError({
            message: 'API通信のデシリアライズに失敗しました。（型の不一致）',
            cause: error,
            extra: {
                cause: {
                    name: error.constructor.name,
                    message: error.message,
                    error: error.error,
                },
            },
        });
    }
};
