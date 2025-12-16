//
// お問い合わせフォーム バックエンド呼び出し
//
import 'client-only';

import client from '@/presentation/(system)/client/client.c';
import { CONTENT_TYPE_APPLICATION_JSON_UTF8 } from '@/presentation/(system)/client/client.constants';
import { Method } from '@/presentation/(system)/client/client.types';
import { bffResult } from '@/presentation/(system)/result/result.bff.factories';
import { BffResult } from '@/presentation/(system)/result/result.bff.types';
import { FormData } from '@/presentation/(system)/validation/validation.types';
import { post } from '@/presentation/contact/mvvm/bff/contact.action';
import { FormKeys } from '@/presentation/contact/mvvm/models/contact.types';

/**
 * バックエンド呼び出しのインターフェース型
 *
 * @param formData - 問い合わせフォームの入力値
 * @returns 正常終了の場合はvoid、差し戻しの場合はバリデーションエラーをBffResultにラップして返す
 */
type Send = {
  (formData: FormData<FormKeys>): Promise<BffResult<void, FormKeys>>;
};

/**
 * バックエンド呼び出しの実装：ServerActions経由バックエンド呼び出し
 */
const _viaAction: Send = async (formData) => {
  return await post(formData);
};

/**
 * バックエンド呼び出しの実装：RouteHandlers経由バックエンド呼び出し
 */
const viaRoute: Send = async (formData) => {
  const url = '/api/contact/mvvm';
  // const { name, email, body } = formData;

  const res = await client.send({
    url,
    method: Method.POST,
    headers: {
      ...CONTENT_TYPE_APPLICATION_JSON_UTF8,
    },
    //body: { name, email, body }, // オブジェクトのまま（JSON.stringify不要）で渡す
    body: formData,
  });
  return bffResult<void, FormKeys>(res.rawBody);
};

/**
 * お問い合わせを送信する
 */
export const send: Send = viaRoute;
