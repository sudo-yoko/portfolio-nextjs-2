import 'server-only';

export { env, envNumber, envProtocol } from './internal/env.helper.validated';
export { envByDynamicKey, envByStaticKey } from './internal/env.s';
