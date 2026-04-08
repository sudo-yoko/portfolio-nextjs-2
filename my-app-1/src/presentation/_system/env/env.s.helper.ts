import 'server-only';

import { env, envNumber, envProtocol } from '@/presentation/_system/env/env.helper.validated';

export const envProxy: { protocol: string; host: string; port: number } = (() => {
    const protocol = envProtocol('PROXY_PROTOCOL');
    const host = env('PROXY_HOST');
    const port = envNumber('PROXY_PORT');
    return { protocol, host, port };
})();

export const proxyUrl: string = (() => {
    const { protocol, host, port } = envProxy;
    return `${protocol}://${host}:${port}`;
})();
