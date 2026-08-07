import 'server-only';

export const zodUtil = {
    /**
     * Zod固有のエラーハンドリングを追加する
     */
    withErrorHandling: <T>(subject: () => T): T => {
        try {
            return subject();
        } catch (error) {
            throw error;
        }
    },
};
