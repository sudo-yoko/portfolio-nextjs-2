import { Client, Result } from '@/presentation/_system/client/client.types';

export const createDummyClient = (): Client => ({
    send: async (_config) => {
        return await new Promise<Result>((resolve) => {
            const result: Result = { status: 200, rawBody: '' };
            resolve(result);
        });
    },
});
