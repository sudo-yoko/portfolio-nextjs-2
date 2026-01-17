import 'server-only';

import { authError } from '@/presentation/_system/error/error.factories';
import logger from '@/presentation/_system/logging/logger.s';

const logPrefix = 'authentication.ts: ';

export function authenticate(): void {
    if (process.env['AUTH_ERROR']) {
        throw authError();
    }
    logger.info(logPrefix + 'auth ok');
}
