import 'client-only';

import { useEffect, useReducer } from 'react';

import { useWithAdvice } from '@/presentation/_system/aspect/aspect.client.useWithAdvice';
import { resultError } from '@/presentation/_system/error/error.factories';
import { isInvalid, isOkData } from '@/presentation/_system/result/result.helpers';
import { fetchData } from '@/presentation/user-list/models/user-list.client';
import {
    initialState,
    reducer,
    setError,
    setViolations,
    Step,
    toIdle,
} from '@/presentation/user-list/view-models/user-list.reducer';
import { withErrorHandlingAsync } from '@/presentation/_system/aspect/internal/aspect.error-handling.client';

const logPrefix = 'user-list.useSearch.ts: ';

export function useSearch() {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        void (async () => {
            await withErrorHandlingAsync(
                () => _(),
                () => setError(dispatch, true),
            );
        })();
        async function _() {
            if (state.step !== Step.Search) {
                return;
            }
            const result = await fetchData(100, state.formData);
            if (isOkData(result)) {
                toIdle(dispatch, result.data);
                return;
            }
            if (isInvalid(result)) {
                setViolations(dispatch, result.violations);
                return;
            }
            throw resultError({ result, location: logPrefix + 'useEffect' });
        }
    }, [state.formData, state.step]);

    return { state, dispatch };
}
