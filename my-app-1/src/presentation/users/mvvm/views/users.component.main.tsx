'use client';

import { Button } from '@/presentation/(system)/components/button.decorator.simple';
import { ProcessingModalB } from '@/presentation/(system)/components/processing.modal.b';
import { ErrorModal } from '@/presentation/(system)/error/views/component.error-modal.feature.close';
import {
    setError,
    setQuery,
    Step,
} from '@/presentation/(system)/pagination/mvvm/view-models/pagination.reducer.2';
import {
    handleNext,
    handlePrev,
    handleReset,
    handleSearch,
    usePagination,
} from '@/presentation/users/mvvm/view-models/users.use-pagination.2';
import UserList from '@/presentation/users/mvvm/views/users.component.list';

export function Main() {
    const { state, dispatch } = usePagination();
    return (
        <div>
            {(state.step === Step.Search || state.step === Step.Next || state.step === Step.Prev) && (
                /*<ProcessingModal>検索しています。お待ちください・・・</ProcessingModal>*/
                <ProcessingModalB />
            )}
            {state.error && <ErrorModal onAction={() => setError(dispatch, false)} />}
            <div>
                <div>検索条件を入力してください。</div>
                <div className="flex flex-row items-center gap-1">
                    <input
                        type="text"
                        value={state.query.userName}
                        onChange={(e) => setQuery(dispatch, 'userName', e.target.value)}
                        placeholder="ID, ユーザー名"
                        className="w-80 border-2 border-gray-400 placeholder:italic focus:placeholder:text-transparent"
                    />
                    <Button onClick={() => handleSearch(state, dispatch)}>検索</Button>
                    <Button onClick={() => handleReset(dispatch)}>リセット</Button>
                </div>
                {state.violationsMap.userName?.map((err, index) => (
                    <div key={index} className="text-red-500">
                        {err}
                    </div>
                ))}
                <div>
                    <div>
                        <div>{JSON.stringify(state.step)}</div>
                        {state.items.length > 0 && (
                            <div className="flex flex-col gap-1">
                                <div>検索条件：{JSON.stringify(state.query)}</div>
                                <PageController
                                    onPrev={() => handlePrev(dispatch)}
                                    onNext={() => handleNext(dispatch)}
                                    page={state.page}
                                />
                                <UserList users={state.items} />
                                <PageController
                                    onPrev={() => handlePrev(dispatch)}
                                    onNext={() => handleNext(dispatch)}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function PageController({ onPrev, onNext, page }: { onPrev: () => void; onNext: () => void; page?: number }) {
    return (
        <div className="flex flex-row items-center gap-1">
            <Button onClick={onPrev}>前へ</Button>
            {page && page}
            <Button onClick={onNext}>次へ</Button>
        </div>
    );
}
