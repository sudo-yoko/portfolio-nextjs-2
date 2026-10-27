import { NextRuntime } from '@my/env';
import { env } from '@my/env';
import { initializeLogger } from '@my/logger/server';

export function register() {
    if (env.next_runtime === NextRuntime.Nodejs) {
        // initializeLogger();
    }
}
