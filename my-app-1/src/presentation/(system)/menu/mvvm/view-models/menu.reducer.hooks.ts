'use client';

import { fetchMenuInfo } from '@/presentation/(system)/menu/mvvm/models/menu.requester';
import {
    Action,
    initialState,
    popoverClose,
    popoverOpen,
    processStart,
    reducer,
    setProfile,
    sidePeekClose,
    sidePeekOpen,
    State,
} from '@/presentation/(system)/menu/mvvm/view-models/menu.reducer';
import { isAborted, isOkData, isRetryable } from '@/presentation/(system)/result/result.core.helpers';
import React, { useEffect, useReducer } from 'react';

export function useMenu() {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        void (async () => {
            await func();
        })();
        async function func() {
            processStart(dispatch);

            const result = await fetchMenuInfo();
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
    }, []);

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
