import { applicationError } from '@/presentation/_system/error/error.factories';

export const DeserUtil = {
    withErrorHandling: <T>(deserialize: () => T, context?: object): T => {
        try {
            return deserialize();
        } catch (error) {
            handleError(error, context);
        }
    },
    withErrorHandlingAsync: async <T>(deserialize: () => Promise<T>, context?: object): Promise<T> => {
        try {
            return await deserialize();
        } catch (error) {
            handleError(error, context);
        }
    },
};

function handleError(error: unknown, context?: object): never {
    throw applicationError({
        message: 'REST通信のデシリアライズに失敗しました。',
        cause: error,
        extra: context,
    });
}
