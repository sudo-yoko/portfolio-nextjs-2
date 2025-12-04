//
// お問い合わせの送信 バックエンド・ファサード
//
// バックエンド呼び出し処理の詳細を隠蔽し、UI向けにシンプルな呼び出し窓口を提供するレイヤー。
// クライアント→BFF→バックエンドAPIといった複数レイヤーにまたがるリクエストをファサードの背面に隠し、UIには呼び出し関数のみを提供する。
//
import 'client-only';

import { parseBffResult } from '@/presentation/(system)/bff/bff.result.helpers';
import { BffResult } from '@/presentation/(system)/bff/bff.result.types';
import client from '@/presentation/(system)/client/client.c';
import { CONTENT_TYPE_APPLICATION_JSON_UTF8 } from '@/presentation/(system)/client/client.constants';
import { Method } from '@/presentation/(system)/client/client.types';
import { FormData, Violations } from '@/presentation/(system)/validation/validation.types';
import { action } from '@/presentation/contact/mvvm/bff/contact.action';
import { FormKeys } from '@/presentation/contact/mvvm/models/contact.types';

/**
 * バックエンド呼び出しのインターフェース型
 */
type SendRequest = {
  (formData: FormData<FormKeys>): Promise<BffResult<void, Violations<FormKeys>>>;
};

/**
 * ServerActions経由バックエンド呼び出し
 */
const _viaAction: SendRequest = async (formData) => {
  return await action(formData);
};

/**
 * RouteHandlers経由バックエンド呼び出し
 */
const viaRoute: SendRequest = async (formData) => {
  const url = '/api/contact/mvvm';
  const { name, email, body } = formData;
  const res = await client.send({
    url,
    method: Method.POST,
    headers: {
      ...CONTENT_TYPE_APPLICATION_JSON_UTF8,
    },
    body: JSON.stringify({ name, email, body }),
  });
  return parseBffResult<void, Violations<FormKeys>>(res.rawBody);
};

/**
 * お問い合わせを送信する
 */
export const sendRequest: SendRequest = viaRoute;
