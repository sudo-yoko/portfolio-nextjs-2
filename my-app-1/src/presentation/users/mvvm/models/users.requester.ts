import 'client-only';

import client from '@/presentation/(system)/client/client.c';
import { CONTENT_TYPE_APPLICATION_JSON_UTF8 } from '@/presentation/(system)/client/client.constants';
import { Method } from '@/presentation/(system)/client/client.types';
import { FetchData, FetchPage } from '@/presentation/(system)/pagination/mvvm/models/pagination.requester';
import { PaginationResult } from '@/presentation/(system)/result/pagination.result.lib';
import { parseResult } from '@/presentation/(system)/result/result.core.helpers';
import { action } from '@/presentation/users/mvvm/bff/users.action';
import { FormKeys, User } from '@/presentation/users/mvvm/models/users.types';

/**
 * ServerActions経由バックエンド実行
 */
const _viaAction: FetchPage<User[], FormKeys> = async (offset, limit, query) => {
  const result = await action(offset, limit, query);
  // return parseFromResult<FetchData<User[]>, FormKeys>(result);
  return result as PaginationResult<FetchData<User[]>, FormKeys>;
};

/**
 * RouteHandlers経由バックエンド実行
 */
const viaRoute: FetchPage<User[], FormKeys> = async (offset, limit, query) => {
  const url = '/api/users/mvvm';
  const res = await client.send({
    url,
    method: Method.POST,
    headers: { ...CONTENT_TYPE_APPLICATION_JSON_UTF8 },
    body: { offset, limit, query },
  });
  // return parseFromText<FetchData<User[]>, FormKeys>(res.rawBody);
  const result = parseResult(res.rawBody);
  return result as PaginationResult<FetchData<User[]>, FormKeys>;

  // const res = await window.fetch(url, {
  // method: POST,
  // headers: CONTENT_TYPE_APPLICATION_JSON_UTF8,
  // body: JSON.stringify({ offset, limit, query }),
  // });
  // if (res.status === 200) {
  // const clone = res.clone();
  // const text = await clone.text();
  // const parsed = parseBoundaryResult<FetchPageResult<User[]>, never>(text);
  // if (parsed !== null) {
  // if (isOk(parsed)) {
  // return parsed;
  // }
  // }
  // }
  // const text = await res.text();
  // throw boundaryError(text);
};

export const fetchPage: FetchPage<User[], FormKeys> = viaRoute;
