'use client';

import { Button } from '@/presentation/_system/components/button.decorator.simple';
import { Action, State, toInput } from '@/presentation/contact/mvva/view-actions/contact.reducer';
import { ViewActions } from '@/presentation/contact/mvva/view-actions/contact.useViewActions';

/**
 * 確認表示コンポーネント
 */
export default function Confirm({
    state,
    dispatch,
    actions,
}: {
    state: State;
    dispatch: React.ActionDispatch<[action: Action]>;
    actions: ViewActions['actions'];
}) {
    return (
        <>
            <div>
                <div>この内容で送信しますか？</div>
            </div>
            <div>
                <div className="py-10">
                    <div>お名前：{state.formData.name}</div>
                    <div>メールアドレス：{state.formData.email}</div>
                    <div>お問い合わせ内容：</div>
                    <div className="whitespace-pre-line">{state.formData.body}</div>
                </div>
                <div className="space-x-4">
                    <Button onClick={() => toInput(dispatch)}>修正する</Button>
                    <Button onClick={actions.send}>送信する</Button>
                </div>
            </div>
        </>
    );
}
