//
// カスタムフック
//
import {
  withInterception,
  withInterceptionAsync,
} from '@/presentation/(system)/middleware/interceptor.feature.client';
import { createPager } from '@/presentation/(system)/pagination/mvvm/models/pagination.pager';
import { FetchPage } from '@/presentation/(system)/pagination/mvvm/models/pagination.requester';
import { Pager } from '@/presentation/(system)/pagination/mvvm/models/pegination.types';
import {
  reducer,
  Step,
  toInvalid,
  toOk,
} from '@/presentation/(system)/pagination/mvvm/view-models/pagination.reducer';
import { isInvalid, isOkData } from '@/presentation/(system)/result/result.core.helpers';
import { FormData, Violations } from '@/presentation/(system)/validation/validation.types';
import React, { useEffect, useReducer, useRef, useState } from 'react';

//
export function usePagination<DATA, FIELD extends string>({
  search,
  fetchCallback,
  initialPage,
  perPage,
  query,
  setItems,
  setViolations,
}: {
  search: boolean;
  fetchCallback: FetchPage<DATA, FIELD>;
  initialPage: number;
  perPage: number;
  query: FormData<FIELD>;
  setItems: React.Dispatch<React.SetStateAction<DATA>>;
  setViolations: React.Dispatch<React.SetStateAction<Violations<FIELD>>>;
}) {
  const [state, dispatch] = useReducer(reducer<DATA>, { step: Step.Initial });
  const [error, setError] = useState(false);
  const pager = useRef<Pager<DATA, FIELD>>(null);

  /**
   * 検索時
   */
  useEffect(() => {
    void (async () => {
      await withInterceptionAsync(() => func(), setError);
    })();

    async function func() {
      if (!search) {
        return;
      }
      pager.current = createPager(fetchCallback, { initialPage, perPage, query });
      const page = await pager.current.current();
      // if (page.tag === 'ok') {
      if (isOkData(page)) {
        toOk(dispatch, page.data.items, page.data.currentPage);
      }
      if (isInvalid(page)) {
        toInvalid(dispatch, page.violations);
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
    withInterception(() => func(), setError);

    function func() {
      if (state.step === Step.Ok) {
        setItems(state.items);
      }
      if (state.step === Step.Invalid) {
        setViolations(state.violations);
      }
    }
  }, [setItems, setViolations, state]);

  return { error, state, pager, dispatch, setError };
}
