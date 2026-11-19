import 'server-only';

import { Aspect, AspectAsync } from '#aspect/internal/aspect.types';
import { authenticate } from '#aspect/internal/aspects/authentication';

export const withAuth: Aspect = (thunk) => {
    return () => {
        authenticate();
        return thunk();
    };
};

export const withAuthAsync: AspectAsync = (thunk) => {
    return async () => {
        authenticate();
        return await thunk();
    };
};
