'use client';

import { AutoResizeTextAreaSimple } from '@/presentation/(system)/components/autoResizeTextArea.decorator.simple';
import { Button } from '@/presentation/(system)/components/button.decorator.simple';
import { ToastError } from '@/presentation/(system)/components/toast.feature.error';
import { getViolationsMap } from '@/presentation/(system)/validation/validation.helpers';
import {
    applyViolations,
    closeRetry,
    handleNext,
} from '@/presentation/contact/mvvm/view-models/contact.handler.event';
import { Action, setValue, State } from '@/presentation/contact/mvvm/view-models/contact.reducer';
import { useEffect } from 'react';

/**
 * 入力フォームコンポーネント
 */
export default function Input({
    state,
    dispatch,
}: {
    state: State;
    dispatch: React.ActionDispatch<[action: Action]>;
}) {
    const violationsMap = getViolationsMap(state.violations);

    useEffect(() => {
        applyViolations(state.violations, dispatch);
    }, [dispatch, state.violations]);

    return (
        <>
            <div>
                <div>お問い合わせフォーム</div>
            </div>
            {state.retryMsg.length > 0 && (
                <ToastError message={state.retryMsg} onClose={() => closeRetry(dispatch)} />
            )}
            <div>
                <div>
                    <div>お名前：</div>
                    <div>
                        <input
                            type="text"
                            value={state.formData.name}
                            onChange={(e) => setValue(dispatch, 'name', e.target.value)}
                            className="w-80 border-2 border-black"
                        />
                    </div>
                    {violationsMap.name?.map((err, index) => (
                        <div key={index}>
                            <p className="text-red-500">{err}</p>
                        </div>
                    ))}
                </div>
                <div>
                    <div>メールアドレス：</div>
                    <div>
                        <input
                            type="text"
                            value={state.formData.email}
                            onChange={(e) => setValue(dispatch, 'email', e.target.value)}
                            className="w-80 border-2 border-black"
                        />
                    </div>
                    {violationsMap.email?.map((err, index) => (
                        <div key={index}>
                            <p className="text-red-500">{err}</p>
                        </div>
                    ))}
                </div>
                <div>
                    <div>お問い合わせ内容：</div>
                    <div>
                        <AutoResizeTextAreaSimple
                            value={state.formData.body}
                            onChange={(value) => setValue(dispatch, 'body', value)}
                            violation={violationsMap.body}
                        />
                    </div>
                    {violationsMap.body?.map((err, index) => (
                        <div key={index}>
                            <p className="text-red-500">{err}</p>
                        </div>
                    ))}
                </div>
                <div>
                    <Button onClick={() => handleNext(state, dispatch)}>次へ</Button>
                </div>
            </div>
        </>
    );
}
