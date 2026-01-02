'use client';

import { Processing } from '@/presentation/(system)/components/processing';
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

    return <Processing>送信中です。お待ちください・・・</Processing>;
}
