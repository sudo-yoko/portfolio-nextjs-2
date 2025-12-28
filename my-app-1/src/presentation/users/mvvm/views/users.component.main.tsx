'use client';

import { Button } from '@/presentation/(system)/components/button.decorator.simple';
import { ErrorRedirect } from '@/presentation/(system)/error/views/component.error-redirect';
import { Step } from '@/presentation/(system)/pagination/mvvm/view-models/pagination.reducer';
import {
    handlePagination,
    handleSearch,
    usePagination,
} from '@/presentation/(system)/pagination/mvvm/view-models/pagination.use-pagination';
import { getViolationsMap } from '@/presentation/(system)/validation/validation.helpers';
import { FormData, Violations } from '@/presentation/(system)/validation/validation.types';
import { fetchPage } from '@/presentation/users/mvvm/models/users.requester';
import { FormKeys, User } from '@/presentation/users/mvvm/models/users.types';
import UserList from '@/presentation/users/mvvm/views/users.component.list';
import { useCallback, useState } from 'react';

export function Main() {
    const [search, setSearch] = useState(false);
    const [formData, setFormData] = useState<FormData<FormKeys>>({ userName: '' });
    const { userName } = formData;
    const [users, setUsers] = useState<User[]>([]);
    const [violations, setViolations] = useState<Violations<FormKeys>>([]);
    const violationsMap = getViolationsMap(violations);
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
                    <Button
                        onClick={() =>
                            handleSearch({ ...query, userName: formData.userName }, setQuery, setSearch)
                        }
                    >
                        検索
                    </Button>
                </div>
                {state.step === Step.Invalid &&
                    violationsMap.userName?.map((err, index) => (
                        <div key={index} className="text-red-500">
                            {err}
                        </div>
                    ))}
                <div>
                    {error && <ErrorRedirect />}
                    {search && state.step === Step.Ok && (
                        <div>
                            <div>検索条件：{JSON.stringify(query)}</div>
                            <Controller
                                onPrev={() => handlePagination('prev', pager, dispatch, setError)}
                                onNext={() => handlePagination('next', pager, dispatch, setError)}
                                page={state.page}
                            />
                            {users && (
                                <div>
                                    <UserList users={users} />
                                    <Controller
                                        onPrev={() => handlePagination('prev', pager, dispatch, setError)}
                                        onNext={() => handlePagination('next', pager, dispatch, setError)}
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

function Controller({ onPrev, onNext, page }: { onPrev: () => void; onNext: () => void; page?: number }) {
    return (
        <div>
            <Button onClick={onPrev}>前へ</Button>
            {page && page}
            <Button onClick={onNext}>次へ</Button>
        </div>
    );
}
