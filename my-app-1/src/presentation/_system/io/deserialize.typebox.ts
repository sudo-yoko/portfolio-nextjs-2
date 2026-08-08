import 'server-only';

import { TSchema, TypeBoxError } from '@sinclair/typebox';
import { TransformDecodeCheckError } from '@sinclair/typebox/value';

import { applicationError } from '@/presentation/_system/error/error.factories';
import logger from '@/presentation/_system/logging/logger.s';

const logPrefix = 'deserialize.typebox.ts: ';

export function tbSchema<T>(schema: TSchema & { static: T }): typeof schema {
    return schema;
}

export const tbUtil = {
    /**
     * TypeBox用エラーハンドリング
     */
    withErrorHandling: <T>(deserialize: () => T): T => {
        try {
            return deserialize();
        } catch (error) {
            handleError(error);
        }
    },
};

function handleError(err: unknown): never {
    if (err instanceof TypeBoxError) {
        const props: Record<string, unknown> = {};
        props['message'] = err.message;
        props['name'] = err.constructor.name;
        if (err instanceof TransformDecodeCheckError) {
            props['error'] = err.error;
        }
        logger.error(logPrefix + props.message);
        throw applicationError({
            message: 'TypeBoxのデシリアライズに失敗しました。',
            cause: err,
            extra: props,
        });
    }
    throw err;
}
