'use client';

import { useReducer, useRef } from 'react';
import { getViolationsMap } from '@/presentation/_system/validation/validation.helpers';
import type { FormKeys } from '@/presentation/contact/mvvm/models/contact.types';
import { dismissRetry, handleNext, handleSearch, submit } from './contact.event-handler';
import {
    failed,
    initialState,
    reducer,
    reset,
    setValue,
    Status,
    toInput,
    toSending,
} from './contact.reducer';

export { Status } from './contact.reducer';

/** View に公開するのは表示用の状態と操作。dispatch と通信処理は公開しない。 */
export function useContactViewModel() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const submitting = useRef(false);

    async function send() {
        // 再レンダー前の連打も防ぐ。送信はマウントではなくユーザー操作から開始する。
        if (submitting.current || state.status !== Status.confirm) return;
        submitting.current = true;
        toSending(dispatch);
        try {
            await submit(state, dispatch, () => failed(dispatch));
        } finally {
            submitting.current = false;
        }
    }

    return {
        state: { ...state, violationsMap: getViolationsMap(state.violations) },
        actions: {
            setValue: (key: FormKeys, value: string) => setValue(dispatch, key, value),
            next: () => handleNext(state, dispatch),
            back: () => toInput(dispatch),
            send,
            searchAddress: () => handleSearch(state, dispatch, () => failed(dispatch)),
            dismissRetry: () => dismissRetry(dispatch),
            reset: () => reset(dispatch),
        },
    };
}

export type ContactViewModel = ReturnType<typeof useContactViewModel>;
