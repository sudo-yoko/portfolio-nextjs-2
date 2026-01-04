'use client';

import { Button } from '@/presentation/(system)/components/button.decorator.simple';
import { ErrorModal } from '@/presentation/(system)/error/views/component.error-modal.feature.reset';
import { setQuery, Step } from '@/presentation/(system)/pagination/mvvm/view-models/pagination.reducer';
import {
    handlePagination,
    handleReset,
    handleSearch,
    usePagination,
} from '@/presentation/users/mvvm/view-models/users.use-pagination';
import UserList from '@/presentation/users/mvvm/views/users.component.list';

export function Main() {
    // const [search, setSearch] = useState(false);
    // const [formData, setFormData] = useState<FormData<FormKeys>>({ userName: '' });
    // const { userName } = formData;
    // const [users, setUsers] = useState<User[]>([]);
    // const [violations, setViolations] = useState<Violations<FormKeys>>([]);
    // const violationsMap: ViolationsMap<FormKeys> = getViolationsMap(violations); // NOTE: setViolationsでviolationsの内容が変わったとき、再レンダリングでここが再実行され新しいマップが再取得される
    //const [query, setQuery] = useState<UsersQuery>({ userId: '', userName });
    // const [query, setQuery] = useState<FormData<FormKeys>>({ userName });
    // const fetchCallback = useCallback(fetchPage, [fetchPage]);
    // const fetchCallback = useCallback(
    //     (offset: number, perPage: number, query: FormData<FormKeys>) => fetchPage(offset, perPage, query),
    //     [],
    // );

    const { error, state, pager, dispatch, setError } = usePagination({
        // search,
        // fetchCallback,
        initialPage: 1,
        perPage: 4,
        // query,
        // setItems: setUsers,
        // setViolations,
    });

    return (
        <div>
            <div>
                <div>検索条件を入力してください。</div>
                <div className="flex flex-row items-center gap-1">
                    <input
                        type="text"
                        value={state.query.userName}
                        onChange={(e) => setQuery(dispatch, 'userName', e.target.value)}
                        className="w-80 border-2 border-gray-400"
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
                    {error && <ErrorModal onAction={() => setError(false)} />}
                    {state.step === Step.Ok && (
                        <div>
                            <div>検索条件：{JSON.stringify(state.query)}</div>
                            <PageController
                                onPrev={() => handlePagination('prev', pager, dispatch, setError)}
                                onNext={() => handlePagination('next', pager, dispatch, setError)}
                                page={state.page}
                            />
                            {state.items && (
                                <div>
                                    <UserList users={state.items} />
                                    <PageController
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

function PageController({ onPrev, onNext, page }: { onPrev: () => void; onNext: () => void; page?: number }) {
    return (
        <div>
            <Button onClick={onPrev}>前へ</Button>
            {page && page}
            <Button onClick={onNext}>次へ</Button>
        </div>
    );
}
