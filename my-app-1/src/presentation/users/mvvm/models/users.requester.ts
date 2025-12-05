import 'client-only';

import { parseBffResult } from '@/presentation/(system)/bff/bff.result.helpers';
import client from '@/presentation/(system)/client/client.c';
import { CONTENT_TYPE_APPLICATION_JSON_UTF8 } from '@/presentation/(system)/client/client.constants';
import { Method } from '@/presentation/(system)/client/client.types';
import {
  FetchPage,
  FetchPageResult,
} from '@/presentation/(system)/pagination/mvvm/models/pagination.requester';
import { Violations } from '@/presentation/(system)/validation/validation.types';
import { action } from '@/presentation/users/mvvm/bff/users.action';
import { FormKeys, User, UsersQuery } from '@/presentation/users/mvvm/models/users.types';

/**
 * ServerActions経由バックエンド実行
 */
const _viaAction: FetchPage<UsersQuery, User[], Violations<FormKeys>> = async (offset, limit, query) => {
  return await action(offset, limit, query);
};

/**
 * Route Handlers経由バックエンド実行
 */
const viaRoute: FetchPage<UsersQuery, User[], Violations<FormKeys>> = async (offset, limit, query) => {
  const url = '/api/users/mvvm';
  const result = await client.send({
    url,
    method: Method.POST,
    headers: { ...CONTENT_TYPE_APPLICATION_JSON_UTF8 },
    body: { offset, limit, query },
  });
  return parseBffResult<FetchPageResult<User[]>, Violations<FormKeys>>(result.rawBody);

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

export const fetchPage: FetchPage<UsersQuery, User[], Violations<FormKeys>> = viaRoute;
