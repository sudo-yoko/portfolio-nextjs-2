'use client';

import { useEffect } from 'react';

import { AutoResizeTextAreaSimple } from '@/presentation/_system/components/autoResizeTextArea.decorator.simple';
import { Button, ButtonMin } from '@/presentation/_system/components/button.decorator.simple';
import { ToastError } from '@/presentation/_system/components/toast.feature.error';
import {
    applyViolations,
    dismissRetry,
    handleNext,
    handleSearch,
} from '@/presentation/contact/mvva/view-models/contact.event-handler';
import { Action, failed, setValue, State } from '@/presentation/contact/mvva/view-models/contact.reducer';

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
    // const violationsMap = getViolationsMap(state.violations);   // TODO: stateに追加すれば

    useEffect(() => {
        applyViolations(state.violations, dispatch);
    }, [dispatch, state.violations]);

    return (
        <>
            <div>
                <div>お問い合わせフォーム</div>
            </div>
            {state.retryMsg.length > 0 && (
                <ToastError message={state.retryMsg} onDismiss={() => dismissRetry(dispatch)} />
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
                    {state.violationsMap.name?.map((err, index) => (
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
                    {state.violationsMap.email?.map((err, index) => (
                        <div key={index}>
                            <p className="text-red-500">{err}</p>
                        </div>
                    ))}
                </div>
                <div>
                    <div>事業所：</div>
                    <div className="flex flex-col gap-1">
                        <div>
                            <input
                                type="text"
                                value={state.formData.zipcode}
                                onChange={(e) => setValue(dispatch, 'zipcode', e.target.value)}
                                placeholder="郵便番号"
                                className="w-32 border-2 border-black"
                            />
                            <ButtonMin onClick={() => handleSearch(state, dispatch, () => failed(dispatch))}>
                                住所検索
                            </ButtonMin>
                        </div>
                        <div>
                            <input
                                type="text"
                                value={state.formData.address1}
                                onChange={(e) => setValue(dispatch, 'address1', e.target.value)}
                                placeholder="都道府県、市区町村、町域"
                                className="w-80 border-2 border-black"
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                value={state.formData.address2}
                                onChange={(e) => setValue(dispatch, 'address2', e.target.value)}
                                placeholder="以降の住所"
                                className="w-80 border-2 border-black"
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <div>お問い合わせ内容：</div>
                    <div>
                        <AutoResizeTextAreaSimple
                            value={state.formData.body}
                            onChange={(value) => setValue(dispatch, 'body', value)}
                            violation={state.violationsMap.body}
                        />
                    </div>
                    {state.violationsMap.body?.map((err, index) => (
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
