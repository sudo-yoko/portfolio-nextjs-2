import 'server-only';

import { nodeEnvNext } from '@my/env';
import { env } from '@my/env/server';

export async function handleRequest(): Promise<void> {
    console.log(env('NODE_ENV'));
    console.log(nodeEnvNext());
    return;
}
