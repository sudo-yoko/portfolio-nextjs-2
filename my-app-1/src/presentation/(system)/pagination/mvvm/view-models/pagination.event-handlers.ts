//
// イベントハンドラー
//
import 'client-only';

import { withInterceptionAsync } from '@/presentation/(system)/middleware/interceptor.client';
import { Pager } from '@/presentation/(system)/pagination/mvvm/models/pegination.types';
import {
  Action,
  toInvalid,
  toOk,
} from '@/presentation/(system)/pagination/mvvm/view-models/pagination.reducer';
import { isInvalid, isOkData } from '@/presentation/(system)/result/result.core.helpers';
import React from 'react';

/**
 * 次へ／前へボタンを押したとき
 *
 * @typeParam T - アイテムの型
 */
export async function handlePagination<ITEMS, FIELD extends string>(
  destination: 'next' | 'prev',
  pager: React.RefObject<Pager<ITEMS, FIELD> | null>,
  dispatch: React.ActionDispatch<[action: Action<ITEMS>]>,
  setError: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<void> {
  await withInterceptionAsync(() => func(), setError);

  async function func() {
    if (pager?.current == null) {
      return;
    }
    const page = destination === 'next' ? await pager.current.next() : await pager.current.prev();
    // if (page.tag === 'ok') {
    if (isOkData(page)) {
      toOk(dispatch, page.data.items, page.data.currentPage);
    }
    if (isInvalid(page)) {
      toInvalid(dispatch, page.violations);
    }
  }
}
