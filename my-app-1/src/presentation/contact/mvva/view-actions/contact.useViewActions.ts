// お問合せフォーム カスタムフック
'use client';

import { useReducer } from 'react';

import { submit } from '@/presentation/contact/mvva/view-actions/contact.event-handler';
import {
    failed,
    initialState,
    reducer,
    toSending,
} from '@/presentation/contact/mvva/view-actions/contact.reducer';

export function useViewActions() {
    const [state, dispatch] = useReducer(reducer, initialState);

    async function send() {
        toSending(dispatch);
        await submit(state, dispatch, () => failed(dispatch));
    }

    return {
        state,
        dispatch,
        actions: {
            send,
        },
    };
}

export type ViewActions = ReturnType<typeof useViewActions>;
