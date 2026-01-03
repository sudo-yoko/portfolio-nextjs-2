'use client';

import { Button } from '@/presentation/(system)/components/button.decorator.simple';
import { ErrorModal } from '@/presentation/(system)/error/views/component.error-modal.feature.reset';
import { Step, toInvalid } from '@/presentation/(system)/pagination/mvvm/view-models/pagination.reducer';
import {
    executePagination,
    executeSearch,
    usePagination,
} from '@/presentation/(system)/pagination/mvvm/view-models/pagination.use-pagination';
import { getViolationsMap, hasError } from '@/presentation/(system)/validation/validation.helpers';
import { FormData, Violations, ViolationsMap } from '@/presentation/(system)/validation/validation.types';
import { fetchPage } from '@/presentation/users/mvvm/models/users.requester';
import { FormKeys, User } from '@/presentation/users/mvvm/models/users.types';
import { validate } from '@/presentation/users/mvvm/models/users.validator';
import UserList from '@/presentation/users/mvvm/views/users.component.list';
import { useCallback, useState } from 'react';

export function Main() {
    const [search, setSearch] = useState(false);
    const [formData, setFormData] = useState<FormData<FormKeys>>({ userName: '' });
    const { userName } = formData;
    const [users, setUsers] = useState<User[]>([]);
    const [violations, setViolations] = useState<Violations<FormKeys>>([]);
    const violationsMap: ViolationsMap<FormKeys> = getViolationsMap(violations); // NOTE: setViolationsでviolationsの内容が変わったとき、再レンダリングでここが再実行され新しいマップが再取得される
    //const [query, setQuery] = useState<UsersQuery>({ userId: '', userName });
    const [query, setQuery] = useState<FormData<FormKeys>>({ userName });
    // const fetchCallback = useCallback(fetchPage, [fetchPage]);
    const fetchCallback = useCallback(
        (offset: number, perPage: number, query: FormData<FormKeys>) => fetchPage(offset, perPage, query),
        [],
    );

    const { error, state, pager, dispatch, setError } = usePagination<User[], FormKeys>({
        search,
        fetchCallback,
        initialPage: 1,
        perPage: 4,
        query,
        setItems: setUsers,
        setViolations,
    });

    function handleSearch() {
        const data: FormData<FormKeys> = { ...query, userName: formData.userName };
        const violations = validate(data);
        if (hasError(violations)) {
            toInvalid(dispatch, violations);
            return;
        }
        executeSearch<User[], FormKeys>(dispatch, data, setQuery, setSearch);
    }

    return (
        <div>
            <div>
                <div>検索条件を入力してください。</div>
                <div>
                    <input
                        type="text"
                        value={formData.userName}
                        onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                        className="w-80 border-2 border-gray-400"
                    />
                    <Button onClick={handleSearch}>検索</Button>
                </div>
                {state.step === Step.Invalid &&
                    violationsMap.userName?.map((err, index) => (
                        <div key={index} className="text-red-500">
                            {err}
                        </div>
                    ))}
                <div>
                    {error && <ErrorModal onAction={() => setError(false)} />}
                    {search && state.step === Step.Ok && (
                        <div>
                            <div>検索条件：{JSON.stringify(query)}</div>
                            <PageController
                                onPrev={() => executePagination('prev', pager, dispatch, setError)}
                                onNext={() => executePagination('next', pager, dispatch, setError)}
                                page={state.page}
                            />
                            {users && (
                                <div>
                                    <UserList users={users} />
                                    <PageController
                                        onPrev={() => executePagination('prev', pager, dispatch, setError)}
                                        onNext={() => executePagination('next', pager, dispatch, setError)}
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function PageController({ onPrev, onNext, page }: { onPrev: () => void; onNext: () => void; page?: number }) {
    return (
        <div>
            <Button onClick={onPrev}>前へ</Button>
            {page && page}
            <Button onClick={onNext}>次へ</Button>
        </div>
    );
}
