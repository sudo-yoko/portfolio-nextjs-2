//
// イベントハンドラー
//
import 'client-only';

import { withErrorHandlingAsync } from '@/presentation/(system)/errors/error-handler.client';
import { Pager } from '@/presentation/(system)/pagination/mvvm/models/types';
import { Action, toResults } from '@/presentation/(system)/pagination/mvvm/view-models/reducer';
import React from 'react';
import { isOkData } from '@/presentation/(system)/result/result.core.helpers';

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
  await withErrorHandlingAsync(() => func(), setError);

  async function func() {
    if (pager?.current == null) {
      return;
    }
    const page = destination === 'next' ? await pager.current.next() : await pager.current.prev();
    if (isOkData(page)) {
      // if (page.tag === 'ok') {
      toResults(dispatch, page.data.items, page.data.currentPage);
    }
  }
}
