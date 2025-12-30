'use client';

import { ErrorModal } from '@/presentation/(system)/error/views/component.error-modal.feature.reset';
import { initialState, reducer, reset, Step } from '@/presentation/contact/mvvm/view-models/contact.reducer';
import Complete from '@/presentation/contact/mvvm/views/contact.component.complete';
import Confirm from '@/presentation/contact/mvvm/views/contact.component.confirm';
import Input from '@/presentation/contact/mvvm/views/contact.component.input';
import Sending from '@/presentation/contact/mvvm/views/contact.component.sending';
import { useReducer } from 'react';

/**
 * お問い合わせフォーム 親クライアントコンポーネント
 */
export default function Main() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <div className="flex h-screen w-screen flex-col items-center py-10">
            {state.step === Step.input && <Input state={state} dispatch={dispatch} />}
            {state.step === Step.confirm && <Confirm state={state} dispatch={dispatch} />}
            {state.step === Step.sending && <Sending state={state} dispatch={dispatch} />}
            {state.step === Step.complete && <Complete />}
            {state.step === Step.abort && <ErrorModal onAction={() => reset(dispatch)} />}
        </div>
    );
}
