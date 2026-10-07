'use client';

import { ErrorModal } from '@/presentation/_system/error/views/component.error-modal.feature.reset';
import { Status, useContactViewModel } from '@/presentation/contact/mvvm/view-models/use-contact-view-model';
import Complete from '@/presentation/contact/mvvm/views/contact.complete';
import Confirm from '@/presentation/contact/mvvm/views/contact.confirm';
import Input from '@/presentation/contact/mvvm/views/contact.input';
import Sending from '@/presentation/contact/mvvm/views/contact.sending';

/**
 * お問い合わせフォーム 親クライアントコンポーネント
 */
export default function Main() {
    const { state, actions } = useContactViewModel();
    return (
        <div className="flex h-screen w-screen flex-col items-center py-10">
            {state.status === Status.input && <Input state={state} actions={actions} />}
            {state.status === Status.confirm && <Confirm state={state} actions={actions} />}
            {state.status === Status.sending && <Sending />}
            {state.status === Status.complete && <Complete />}
            {state.status === Status.abort && <ErrorModal onAction={actions.reset} />}
        </div>
    );
}
