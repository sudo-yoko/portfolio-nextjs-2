'use client';

import { withAdviceAsync } from '@/presentation/_system/aspect/aspect.client';
import { fetchHeader } from '@/presentation/_system/header/mvvm/models/header.requester';
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
} from '@/presentation/_system/header/mvvm/view-models/header.reducer';
import { isAborted, isOkData, isRetryable } from '@/presentation/_system/result/result.helpers';
import React, { useEffect, useReducer } from 'react';

export function useHeader() {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        processStart(dispatch);
    }, []);

    useEffect(() => {
        // NOTE: withAdviceAsyncをawaitするため、非同期関数でラップする。
        // （useEffect の第一引数に渡す関数は非同期関数は不可のため非同期関数でラップする）
        void _();
        async function _() {
            if (state.step === Step.Processing) {
                await withAdviceAsync(
                    () => __(),
                    () => processAbort(dispatch),
                );
            }
        }
        async function __() {
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
