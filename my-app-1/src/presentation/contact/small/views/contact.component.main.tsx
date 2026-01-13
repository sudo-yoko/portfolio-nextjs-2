'use client';

import { ProcessingModalB } from '@/presentation/(system)/components/processing.modal.b';
import { ToastError } from '@/presentation/(system)/components/toast.feature.error';
import { ErrorModal } from '@/presentation/(system)/error/views/component.error-modal.feature.reset';
import { Mode, reset, Step } from '@/presentation/contact/small/view-models/contact.reducer';
import { dismissRetryMsg, useContact } from '@/presentation/contact/small/view-models/contact.reducer.hooks';
import Complete from '@/presentation/contact/small/views/contact.component.complete';
import Confirm from '@/presentation/contact/small/views/contact.component.confirm';
import Input from '@/presentation/contact/small/views/contact.component.input';

/**
 * お問い合わせフォーム 親クライアントコンポーネント
 */
export default function Main() {
    const { state, dispatch } = useContact();
    return (
        <div>
            <div>{JSON.stringify(state)}</div>
            <div className="flex h-screen w-screen flex-col items-center py-10">
                {state.mode === Mode.Input && <Input state={state} dispatch={dispatch} />}
                {state.mode === Mode.Confirm && <Confirm state={state} dispatch={dispatch} />}
                {state.mode === Mode.Complete && <Complete />}
                {state.step === Step.Send && (
                    /*<ProcessingModalA>送信しています・・・</ProcessingModalA>*/
                    <ProcessingModalB />
                )}
                {state.step === Step.Abort && <ErrorModal onAction={() => reset(dispatch)} />}
                {state.retryMsg.length > 0 && (
                    <ToastError message={state.retryMsg} onDismiss={() => dismissRetryMsg(dispatch)} />
                )}
            </div>
        </div>
    );
}
