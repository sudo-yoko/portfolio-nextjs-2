import 'server-only';

import { envString, envNumber, envProtocol } from '../internal/server/env.s.helper.validated';

// TODO: 即時実行のため、importしただけで実行されるが、そのとき環境変数が設定されていない場合にエラーになる。
// import時にこのエラーになるのは作りとしてあまり良くない？
export const envProxy: { protocol: string; host: string; port: number } = (() => {
    const protocol = envProtocol('PROXY_PROTOCOL');
    const host = envString('PROXY_HOST');
    const port = envNumber('PROXY_PORT');
    return { protocol, host, port };
})();

export const proxyUrl: string = (() => {
    const { protocol, host, port } = envProxy;
    return `${protocol}://${host}:${port}`;
})();
