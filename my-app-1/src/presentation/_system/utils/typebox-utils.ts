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
            if (error instanceof TransformDecodeCheckError) {
                throw applicationError({
                    message: error.message,
                    cause: error,
                    extra: { errType: 'TransformDecodeCheckError', ...error.error },
                });
            }
            throw error;
        }
    },
};
