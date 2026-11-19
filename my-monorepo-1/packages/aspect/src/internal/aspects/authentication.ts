import 'server-only';

import { authError } from '@my/error';
import logger from '@my/logger/server';

const logPrefix = 'authentication.ts: ';

export function authenticate(): void {
    const location = 'authenticate';

    if (process.env['AUTH_ERROR']) {
        throw authError({ location: logPrefix + location });
    }
    logger.info(logPrefix + 'auth ok');
}
