'use client';

import { ProcessingModal } from '@/presentation/(system)/components/processing.modal';
import { ToastError } from '@/presentation/(system)/components/toast.feature.error';
import { ErrorModal } from '@/presentation/(system)/error/views/component.error-modal.feature.reset';
import {
    applyViolations,
    closeRetry,
    submit,
} from '@/presentation/contact/small/view-models/contact.reducer.hooks';
import {
    initialState,
    Mode,
    reducer,
    reset,
    setAbort,
    Step,
} from '@/presentation/contact/small/view-models/contact.reducer';
import Complete from '@/presentation/contact/small/views/contact.component.complete';
import Confirm from '@/presentation/contact/small/views/contact.component.confirm';
import Input from '@/presentation/contact/small/views/contact.component.input';
import { useEffect, useReducer } from 'react';

/**
 * お問い合わせフォーム 親クライアントコンポーネント
 */
export default function Main() {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        void (async () => {
            if (state.step === Step.Send) {
                await submit(state, dispatch, () => setAbort(dispatch));
            }
        });
    }, [dispatch, state]);

    useEffect(() => {
        applyViolations(state.violations, dispatch);
    }, [dispatch, state.violations]);

    return (
        <div>
            <div>{JSON.stringify(state)}</div>
            <div className="flex h-screen w-screen flex-col items-center py-10">
                {state.mode === Mode.Input && <Input state={state} dispatch={dispatch} />}
                {state.mode === Mode.Confirm && <Confirm state={state} dispatch={dispatch} />}
                {state.mode === Mode.Complete && <Complete />}
                {state.step === Step.Send && (
                    <ProcessingModal>送信しています。お待ちください・・・</ProcessingModal>
                )}
                {state.step === Step.Abort && <ErrorModal onAction={() => reset(dispatch)} />}
                {state.retryMsg.length > 0 && (
                    <ToastError message={state.retryMsg} onClose={() => closeRetry(dispatch)} />
                )}
            </div>
        </div>
    );
}
