import 'server-only';

import { AroundAdvice, AroundAdviceAsync } from '#aspect/internal/aspect.types';
import { authenticate } from '#aspect/internal/aspects/authentication';

export const withAuth: AroundAdvice = (thunk) => {
    return () => {
        authenticate();
        return thunk();
    };
};

export const withAuthAsync: AroundAdviceAsync = (thunk) => {
    return async () => {
        authenticate();
        return await thunk();
    };
};
