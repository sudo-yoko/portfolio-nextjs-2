import 'client-only';

import client from '@/presentation/(system)/client/client.c';
import { CONTENT_TYPE_APPLICATION_JSON_UTF8 } from '@/presentation/(system)/client/client.constants';
import { Method } from '@/presentation/(system)/client/client.types';
import {
  FetchPage,
  FetchPageResult,
} from '@/presentation/(system)/pagination/mvvm/models/pagination.requester';
import { bffResult } from '@/presentation/(system)/result/result.bff.factories';
import { action } from '@/presentation/users/mvvm/bff/users.action';
import { FormKeys, User } from '@/presentation/users/mvvm/models/users.types';

/**
 * ServerActions経由バックエンド実行
 */
const _viaAction: FetchPage<User[], FormKeys> = async (offset, limit, query) => {
  return await action(offset, limit, query);
};

/**
 * RouteHandlers経由バックエンド実行
 */
const viaRoute: FetchPage<User[], FormKeys> = async (offset, limit, query) => {
  const url = '/api/users/mvvm';
  const result = await client.send({
    url,
    method: Method.POST,
    headers: { ...CONTENT_TYPE_APPLICATION_JSON_UTF8 },
    body: { offset, limit, query },
  });
  return bffResult<FetchPageResult<User[]>, FormKeys>(result.rawBody);

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
