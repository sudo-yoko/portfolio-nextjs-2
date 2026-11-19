import { Aspect, AspectAsync } from '#aspect/aspect.types';
import { Logger } from '@my/logger';

export type Ctx = {
    logger: Logger;
    logPrefix: string;
    process: string;
};

export function createWithLogging({ logger, logPrefix, process }: Ctx) {
    const withLogging: Aspect = (thunk) => {
        return () => {
            logger.info(`${logPrefix}>>>>>>>>>>>>>>>>>>>>> ${process} start.`);
            try {
                return thunk();
            } finally {
                logger.info(`${logPrefix}<<<<<<<<<<<<<<<<<<<<< ${process} end.`);
            }
        };
    };
    return withLogging;
}

export function createWithLoggingAsync({ logger, logPrefix, process }: Ctx) {
    const withLoggingAsync: AspectAsync = (thunk) => {
        return async () => {
            logger.info(`${logPrefix}>>>>>>>>>>>>>>>>>>>>> ${process} start.`);
            try {
                return await thunk();
            } finally {
                logger.info(`${logPrefix}<<<<<<<<<<<<<<<<<<<<< ${process} end.`);
            }
        };
    };
    return withLoggingAsync;
}
