// import 'server-only';    // ZipCloudでクライアントサイドから直接fetchするためクライアントサイドでもデリシアイズする

import { ZodError } from 'zod';

import { applicationError } from '@/presentation/_system/error/error.factories';
// import logger from '@/presentation/_system/logging/logger.s';

const logPrefix = 'deserialize.zod.ts: ';

export const zodUtil = {
    /**
     * Zod固有のエラーハンドリングを追加する
     */
    withErrorHandling: <T>(subject: () => T): T => {
        try {
            return subject();
        } catch (error) {
            handleError(error);
        }
    },
};

function handleError(err: unknown): never {
    if (err instanceof ZodError) {
        const props: Record<string, unknown> = {};
        props['name'] = err.constructor.name;
        // logger.error(logPrefix + props.message);
        throw applicationError({
            message: 'Zodのデシリアライズに失敗しました。',
            cause: err,
            extra: { ZodError: props },
        });
    }
    throw err;
}
