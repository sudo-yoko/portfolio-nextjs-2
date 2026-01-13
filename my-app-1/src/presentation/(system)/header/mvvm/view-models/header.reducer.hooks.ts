'use client';

import { withErrorHandlingAsync } from '@/presentation/(system)/aop/aop.core.exception.client';
import { fetchHeader } from '@/presentation/(system)/header/mvvm/models/header.requester';
import {
    Action,
    initialState,
    popoverClose,
    popoverOpen,
    processAbort,
    processStart,
    reducer,
    setProfile,
    sidePeekClose,
    sidePeekOpen,
    State,
    Step,
} from '@/presentation/(system)/header/mvvm/view-models/header.reducer';
import { isAborted, isOkData, isRetryable } from '@/presentation/(system)/result/result.core.helpers';
import React, { useEffect, useReducer } from 'react';

export function useHeader() {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        processStart(dispatch);
    }, []);

    useEffect(() => {
        if (state.step === Step.Processing) {
            void (async () => {
                await withErrorHandlingAsync(
                    () => func(),
                    () => processAbort(dispatch),
                );
            })();
        }
        async function func() {
            const result = await fetchHeader();
            if (isOkData(result)) {
                setProfile(dispatch, result.data);
                return;
            }
            if (isRetryable(result)) {
                return;
            }
            if (isAborted(result)) {
                return;
            }
        }
    }, [state.step]);
    return { state, dispatch };
}

export function handleSidePeek(state: State, dispatch: React.Dispatch<Action>): void {
    if (state.isSidePeek) {
        sidePeekClose(dispatch);
    } else {
        sidePeekOpen(dispatch);
    }
}

export function handlePopover(state: State, dispatch: React.Dispatch<Action>): void {
    if (state.isPopover) {
        popoverClose(dispatch);
    } else {
        popoverOpen(dispatch);
    }
}
