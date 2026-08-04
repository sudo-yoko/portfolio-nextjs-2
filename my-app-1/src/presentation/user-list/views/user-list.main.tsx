'use client';

import { Button } from '@/presentation/_system/components/button.decorator.simple';
import { ProcessingModalB } from '@/presentation/_system/components/processing.modal.b';
import { ErrorModal } from '@/presentation/_system/error/views/component.error-modal.feature.close';
import { handleReset, handleSearch, useSearch } from '@/presentation/user-list/view-models/user-list.hooks';
import { setKeyword, Step } from '@/presentation/user-list/view-models/user-list.reducer';
import UserList from '@/presentation/user-list/views/user-list.list';

export function Main() {
    const { state, dispatch } = useSearch();
    return (
        <div>
            {state.step === Step.Search && (
                /*<ProcessingModal>検索しています。お待ちください・・・</ProcessingModal>*/
                <ProcessingModalB />
            )}
            {state.error && <ErrorModal onAction={() => setError(dispatch, false)} />}
            <div>
                <div>検索条件を入力してください。</div>
                <div className="flex flex-row items-center gap-1">
                    <input
                        type="text"
                        value={state.formData.keyword}
                        onChange={(e) => setKeyword(dispatch, 'keyword', e.target.value)}
                        placeholder="ID, ユーザー名"
                        className="w-80 border-2 border-gray-400 placeholder:italic focus:placeholder:text-transparent"
                    />
                    <Button onClick={() => handleSearch(state, dispatch)}>検索</Button>
                    <Button onClick={() => handleReset(dispatch)}>リセット</Button>
                </div>
                {state.violationsMap.keyword?.map((err, index) => (
                    <div key={index} className="text-red-500">
                        {err}
                    </div>
                ))}
                <div>
                    <div>
                        <div>{JSON.stringify(state.step)}</div>
                        {state.items.length > 0 && (
                            <div className="flex flex-col gap-1">
                                <div>検索条件：{JSON.stringify(state.formData)}</div>
                                <UserList users={state.items} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
