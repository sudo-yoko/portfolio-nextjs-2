'use client';

import {
    Action,
    initialState,
    popoverClose,
    popoverOpen,
    reducer,
    sidePeekClose,
    sidePeekOpen,
    State,
} from '@/presentation/(system)/menu/mvvm/view-models/menu.reducer';
import React, { useReducer } from 'react';

export function useMenu() {
    const [state, dispatch] = useReducer(reducer, initialState);
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
