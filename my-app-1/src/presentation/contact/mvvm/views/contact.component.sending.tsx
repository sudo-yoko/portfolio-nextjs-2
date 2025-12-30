'use client';

import { submit } from '@/presentation/contact/mvvm/view-models/contact.handler.event';
import { Action, State, toAbort } from '@/presentation/contact/mvvm/view-models/contact.reducer';
import React, { useEffect } from 'react';

/**
 * 送信中表示コンポーネント
 */
export default function Sending({
    state,
    dispatch,
}: {
    state: State;
    dispatch: React.ActionDispatch<[action: Action]>;
}) {
    useEffect(() => {
        // 書き方その１
        void (async () => {
            await submit(state, dispatch, () => toAbort(dispatch));
        })();

        // 書き方その２
        // async function process() {
        // await send(state, dispatch, setError);
        // }
        // void process();

        // 書き方その３
        // void send(state, dispatch, setError).then(() => {});
    }, [dispatch, state, state.formData]);

    return (
        <div>
            <div className="inset-0 z-50 flex flex-col items-center justify-center bg-white/50">
                <div className="size-16 animate-spin rounded-full border-t-4 border-solid border-t-gray-300"></div>
                <p className="mt-4 animate-pulse text-lg text-gray-700">
                    送信中です。しばらくお待ちください・・・
                </p>
            </div>
        </div>
    );
}
