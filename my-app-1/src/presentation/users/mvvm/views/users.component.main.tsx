'use client';

import { ErrorRedirect } from '@/presentation/(system)/error/views/component.error-redirect';
import { Step } from '@/presentation/(system)/pagination/mvvm/view-models/pagination.reducer';
import {
    handlePagination,
    handleSearch,
    usePagination,
} from '@/presentation/(system)/pagination/mvvm/view-models/pagination.use-pagination';
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
    const [violations, setViolations] = useState<Violations<FormKeys>>({ userName: [''] });
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
                    <button
                        type="button"
                        onClick={() =>
                            handleSearch({ ...query, userName: formData.userName }, setQuery, setSearch)
                        }
                        className="rounded-lg bg-indigo-300 px-4 py-2"
                    >
                        検索
                    </button>
                </div>
                {state.step === Step.Invalid &&
                    violations.userName?.map((err, index) => (
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
            <button type="button" onClick={onPrev} className="rounded-lg bg-indigo-300 px-4 py-2">
                前へ
            </button>
            {page && page}
            <button type="button" onClick={onNext} className="rounded-lg bg-indigo-300 px-4 py-2">
                次へ
            </button>
        </div>
    );
}
