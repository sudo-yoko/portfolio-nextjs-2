//
// ページネーション共通コンポーネント
//
'use client';

import { withErrorHandlingAsync } from '@/presentation/(system)/errors/error-handler.client';
import { ErrorRedirect } from '@/presentation/(system)/errors/views/component.error-redirect';
import { createPager } from '@/presentation/(system)/pagination/min/modules/pager';
import { FetchPage, Pager } from '@/presentation/(system)/pagination/min/modules/types';
import React, { useCallback, useEffect, useRef, useState } from 'react';

export function Pagination<TItems, TQuery>({
  search,
  fetchPage,
  initialPage,
  perPage,
  query,
  setItems,
}: {
  search: boolean;
  fetchPage: FetchPage<TItems, TQuery>;
  initialPage: number;
  perPage: number;
  query: TQuery;
  setItems: React.Dispatch<React.SetStateAction<TItems>>;
}) {
  const [error, setError] = useState(false);
  const [page, setPage] = useState(initialPage);
  const pager = useRef<Pager<TItems>>(null);
  // [Next.js 16 Compatibility Fix] useCallbackの第一引数の関数は、インライン関数で書く必要がある。
  // const fetchCallback = useCallback(fetchPage, [fetchPage]);
  const fetchCallback = useCallback(
    (offset: number, perPage: number, query: TQuery) => fetchPage(offset, perPage, query),
    [fetchPage],
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
      setItems(page.items);
      setPage(page.currentPage);
    }
  }, [fetchCallback, initialPage, perPage, query, search, setItems]);

  function handleNext() {
    // Promiseチェーンで書く場合は、withErrorHandlingのエラーハンドリングは効果が無いので
    // 以下のようにエラーハンドリングを記述する
    pager.current
      ?.next()
      .then((page) => {
        setItems(page.items);
        setPage(page.currentPage);
      })
      .catch((_e) => setError(true));
  }

  function handlePrev() {
    pager.current
      ?.prev()
      .then((page) => {
        setItems(page.items);
        setPage(page.currentPage);
      })
      .catch((_e) => setError(true));
  }

  return (
    <div>
      {error && <ErrorRedirect />}
      {search && (
        <div>
          <div>検索条件：{JSON.stringify(query)}</div>
          <div>
            <button type="button" onClick={() => handlePrev()} className="rounded-lg bg-indigo-300 px-4 py-2">
              前へ
            </button>
            {page}
            <button type="button" onClick={() => handleNext()} className="rounded-lg bg-indigo-300 px-4 py-2">
              次へ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
