'use client';

import { ErrorModal } from '@/presentation/_system/error/views/component.error-modal.feature.reset';
import {
    initialState,
    reducer,
    reset,
    Status,
} from '@/presentation/contact/mvva/view-actions/contact.reducer';
import Complete from '@/presentation/contact/mvva/views/contact.complete';
import Confirm from '@/presentation/contact/mvva/views/contact.confirm';
import Input from '@/presentation/contact/mvva/views/contact.input';
import Sending from '@/presentation/contact/mvva/views/contact.sending';
import { useReducer } from 'react';

/**
 * お問い合わせフォーム 親クライアントコンポーネント
 */
export default function Main() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <div className="flex h-screen w-screen flex-col items-center py-10">
            {state.status === Status.input && <Input state={state} dispatch={dispatch} />}
            {state.status === Status.confirm && <Confirm state={state} dispatch={dispatch} />}
            {state.status === Status.sending && <Sending state={state} dispatch={dispatch} />}
            {state.status === Status.complete && <Complete />}
            {state.status === Status.abort && <ErrorModal onAction={() => reset(dispatch)} />}
        </div>
    );
}
