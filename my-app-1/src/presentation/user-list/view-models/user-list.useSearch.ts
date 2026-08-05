import 'client-only';

import { useEffect, useReducer } from 'react';

import { useWithAdvice } from '@/presentation/_system/aspect/aspect.client.useWithAdvice';
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

export function useSearch() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { withAdviceAsync } = useWithAdvice();

    useEffect(() => {
        void (async () => {
            await withAdviceAsync(
                () => _(),
                () => setError(dispatch, true),
            );
        })();
        async function _() {
            if (state.step !== Step.Search) {
                return;
            }
            const data = await fetchData(100, state.formData);
            if (isOkData(data)) {
                toIdle(dispatch, data.data);
            }
            if (isInvalid(data)) {
                setViolations(dispatch, data.violations);
            }
        }
    }, [state.formData, state.step]);

    return { state, dispatch };
}
