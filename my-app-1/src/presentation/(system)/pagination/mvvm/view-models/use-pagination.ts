//
// カスタムフック
//
import {
  withErrorHandling,
  withErrorHandlingAsync,
} from '@/presentation/(system)/errors/error-handler.client';
import { createPager } from '@/presentation/(system)/pagination/mvvm/models/pager';
import { FetchPage } from '@/presentation/(system)/pagination/mvvm/models/pagination.requester';
import { Pager } from '@/presentation/(system)/pagination/mvvm/models/types';
import { reducer, toResults } from '@/presentation/(system)/pagination/mvvm/view-models/reducer';
import { useEffect, useReducer, useRef, useState } from 'react';

//
export function usePagination<QUERY, RESULT, REASON>({
  search,
  fetchCallback,
  initialPage,
  perPage,
  query,
  setItems,
}: {
  search: boolean;
  fetchCallback: FetchPage<QUERY, RESULT, REASON>;
  initialPage: number;
  perPage: number;
  query: QUERY;
  setItems: React.Dispatch<React.SetStateAction<RESULT>>;
}) {
  const [state, dispatch] = useReducer(reducer<RESULT>, { step: 'initial' });
  const [error, setError] = useState(false);
  const pager = useRef<Pager<RESULT>>(null);

  console.log('presentation');

  /**
   * 検索時
   */
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
      toResults(dispatch, page.items, page.currentPage);
    }
  }, [fetchCallback, initialPage, perPage, query, search]);

  /**
   * 検索結果の反映
   */
  useEffect(() => {
    // dispatchした結果のstateを同じeffect内で安全に見られない。
    // dispatchした結果のstateを他コンポーネントに連携する関係で結果のstateを取得する必要がある。
    // そのため別の依存配列の別effectにしている。
    withErrorHandling(() => func(), setError);

    function func() {
      if (state.step === 'results') {
        setItems(state.items);
      }
    }
  }, [setItems, state]);

  return { error, state, pager, dispatch, setError };
}
