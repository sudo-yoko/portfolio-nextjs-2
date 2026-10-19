import 'server-only';

import logger from '#logger/internal/logger.s';
import { envEnableLoggerInitialization } from '@my/env/server';

export function initializeLogger() {
    if (envEnableLoggerInitialization()) {
        logger.initialize();
    }
}
