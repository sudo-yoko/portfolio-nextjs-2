import { Client } from '@/presentation/_system/client/client.types';

export const stubClient = (): Client => ({
    send: async (_config) => {
        return { status: 200, rawBody: '' };
    },
});
