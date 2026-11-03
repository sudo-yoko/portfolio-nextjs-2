import 'client-only';

import { bffClient } from '@my/client/browser';

type Send = {
    (): Promise<void>;
};

const viaRoute: Send = async () => {
    await bffClient.send({
        url: '/api/bff/test/client',
    });
};

export const send: Send = viaRoute;
