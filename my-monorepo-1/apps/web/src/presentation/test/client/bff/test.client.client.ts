import 'client-only';

import { Method } from '@my/client';
import client from '@my/client/client';

type Send = {
    (): Promise<void>;
};

const viaRoute: Send = async () => {
    await client.send({
        url: '/api/bff/test/client',
        method: Method.GET,
    });
};

export const send: Send = viaRoute;
