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
import { isOkData } from '@/presentation/(system)/result/result.core.helpers';
import { FormData } from '@/presentation/(system)/validation/validation.types';
import { useEffect, useReducer, useRef, useState } from 'react';

//
export function usePagination<DATA, FIELD extends string>({
  search,
  fetchCallback,
  initialPage,
  perPage,
  query,
  setItems,
}: {
  search: boolean;
  fetchCallback: FetchPage<DATA, FIELD>;
  initialPage: number;
  perPage: number;
  query: FormData<FIELD>;
  setItems: React.Dispatch<React.SetStateAction<DATA>>;
}) {
  const [state, dispatch] = useReducer(reducer<DATA>, { step: 'initial' });
  const [error, setError] = useState(false);
  const pager = useRef<Pager<DATA, FIELD>>(null);

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
      if (isOkData(page)) {
        // if (page.tag === 'ok') {
        toResults(dispatch, page.data.items, page.data.currentPage);
      }
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
