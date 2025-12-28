'use client';

import { withErrorHandlingAsync } from '@/presentation/(system)/aop/aop.core.exception.client';
import { Button } from '@/presentation/(system)/components/button.decorator.simple';
import { ErrorRedirect } from '@/presentation/(system)/error/views/component.error-redirect';
import { createPager } from '@/presentation/(system)/pagination/min/modules/pagination.pager';
import { Pager } from '@/presentation/(system)/pagination/min/modules/pagination.types.c';
import { isInvalid, isOkData } from '@/presentation/(system)/result/result.core.helpers';
import { getViolationsMap } from '@/presentation/(system)/validation/validation.helpers';
import { FormData, Violations } from '@/presentation/(system)/validation/validation.types';
import { fetchPage } from '@/presentation/users/min/modules/users.requester';
import { FormKeys, User } from '@/presentation/users/min/modules/users.types';
import { useCallback, useEffect, useRef, useState } from 'react';

const initialPage = 1;
const perPage = 4;

export default function UserList() {
    const [search, setSearch] = useState(false);
    const [formData, setFormData] = useState<FormData<FormKeys>>({ userName: '' });
    const [users, setUsers] = useState<User[]>([]);
    const { userName } = formData; // 各レンダーで作り直される“その回のスナップショット”
    const [query, setQuery] = useState<FormData<FormKeys>>({ userName });
    //const queryMemo: UsersQuery = useMemo(() => ({ userId: '', userName:'' }), []);
    const [violations, setViolations] = useState<Violations<FormKeys>>([]);
    const violationsMap = getViolationsMap(violations);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(initialPage);
    const pager = useRef<Pager<User[], FormKeys>>(null);
    // [Next.js 16 Compatibility Fix] useCallbackの第一引数の関数は、インライン関数で書く必要がある。
    // const fetchCallback = useCallback(fetchPage, [fetchPage]);
    const fetchCallback = useCallback(
        (offset: number, perPage: number, query: FormData<FormKeys>) => fetchPage(offset, perPage, query),
        [],
    );

    useEffect(() => {
        void (async () => {
            await withErrorHandlingAsync(() => func(), setError);
        })();

        async function func() {
            if (!search) {
                return;
            }
            pager.current = createPager(fetchCallback, { initialPage, perPage, query });
            const page = await pager.current.current();
            if (isOkData(page)) {
                setUsers(page.data.items);
                setPage(page.data.currentPage);
                setViolations([]);
            }
            if (isInvalid(page)) {
                setUsers([]);
                setViolations(page.violations);
            }
        }
    }, [fetchCallback, query, search, setUsers]);

    function handleSearch() {
        setQuery({ ...query, userName: formData.userName });
        setSearch(true);
    }

    function handleNext() {
        // Promiseチェーンで書く場合は、withErrorHandlingのエラーハンドリングは効果が無いので
        // 以下のようにエラーハンドリングを記述する
        pager.current
            ?.next()
            .then((page) => {
                if (isOkData(page)) {
                    setUsers(page.data.items);
                    setPage(page.data.currentPage);
                }
            })
            .catch((_e) => setError(true));
    }

    function handlePrev() {
        pager.current
            ?.prev()
            .then((page) => {
                if (isOkData(page)) {
                    setUsers(page.data.items);
                    setPage(page.data.currentPage);
                }
            })
            .catch((_e) => setError(true));
    }

    return (
        <>
            <div>
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
                        {violationsMap.userName?.map((err, index) => (
                            <div key={index} className="text-red-500">
                                {err}
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    {error && <ErrorRedirect />}
                    {search && users.length > 0 && (
                        <div>
                            <div>検索条件：{JSON.stringify(query)}</div>
                            <div>
                                <Button onClick={() => handlePrev()}>前へ</Button>
                                {page}
                                <Button onClick={() => handleNext()}>次へ</Button>
                            </div>
                        </div>
                    )}
                </div>
                {/** 一覧 */}
                {users.length > 0 && <List users={users} />}
            </div>
        </>
    );
}

function List({ users }: { users: User[] }) {
    return (
        <div>
            <table className="border-collapse border border-gray-400">
                <thead>
                    <tr>
                        <th className="border border-gray-300">ID</th>
                        <th className="border border-gray-300">名前</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.userId}>
                            <td className="border border-gray-300">{user.userId}</td>
                            <td className="border border-gray-300">{user.userName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
