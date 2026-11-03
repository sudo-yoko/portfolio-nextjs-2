import 'server-only';

import { envNodeEnvNext } from '@my/env';
import { env_s } from '@my/env/server';

export async function handleRequest(): Promise<void> {
    console.log(env_s.get('NODE_ENV'));
    console.log(envNodeEnvNext());
    return;
}
