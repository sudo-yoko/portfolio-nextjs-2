'use client';

import { AutoResizeTextAreaSimple } from '@/presentation/_system/components/autoResizeTextArea.decorator.simple';
import { Button, ButtonMin } from '@/presentation/_system/components/button.decorator.simple';
import { ToastError } from '@/presentation/_system/components/toast.feature.error';
import type { ContactViewModel } from '@/presentation/contact/mvvm/view-models/use-contact-view-model';

/**
 * 入力フォームコンポーネント
 */
export default function Input({ state, actions }: ContactViewModel) {
    return (
        <>
            <div>
                <div>お問い合わせフォーム</div>
            </div>
            {state.retryMsg.length > 0 && (
                <ToastError message={state.retryMsg} onDismiss={actions.dismissRetry} />
            )}
            <div>
                <div>
                    <div>お名前：</div>
                    <div>
                        <input
                            type="text"
                            value={state.formData.name}
                            onChange={(e) => actions.setValue('name', e.target.value)}
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
                            onChange={(e) => actions.setValue('email', e.target.value)}
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
                                onChange={(e) => actions.setValue('zipcode', e.target.value)}
                                placeholder="郵便番号"
                                className="w-32 border-2 border-black"
                            />
                            <ButtonMin onClick={actions.searchAddress}>住所検索</ButtonMin>
                        </div>
                        <div>
                            <input
                                type="text"
                                value={state.formData.address1}
                                onChange={(e) => actions.setValue('address1', e.target.value)}
                                placeholder="都道府県、市区町村、町域"
                                className="w-80 border-2 border-black"
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                value={state.formData.address2}
                                onChange={(e) => actions.setValue('address2', e.target.value)}
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
                            onChange={(value) => actions.setValue('body', value)}
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
                    <Button onClick={actions.next}>次へ</Button>
                </div>
            </div>
        </>
    );
}
