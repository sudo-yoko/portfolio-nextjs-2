'use client';

import { AutoResizeTextAreaSimple } from '@/presentation/_system/components/autoResizeTextArea.decorator.simple';
import { Button } from '@/presentation/_system/components/button.decorator.simple';
import { handleNext } from '@/presentation/contact/small/view-models/contact.reducer.hooks';
import { Action, setValue, State } from '@/presentation/contact/small/view-models/contact.reducer';

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
    return (
        <>
            <div>
                <div>お問い合わせフォーム</div>
            </div>
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
