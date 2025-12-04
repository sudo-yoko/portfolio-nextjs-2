//
// お問い合わせの送信 バックエンド・ゲートウェイ
//
// バックエンド（サーバーサイド）実行窓口
//
import 'client-only';

import { parseBffResult } from '@/presentation/(system)/bff/bff.result.helpers';
import { BffResult } from '@/presentation/(system)/bff/bff.result.types';
import client from '@/presentation/(system)/client/client.c';
import { CONTENT_TYPE_APPLICATION_JSON_UTF8 } from '@/presentation/(system)/client/client.constants';
import { Method } from '@/presentation/(system)/client/client.types';
import { FormData, Violations } from '@/presentation/(system)/validation/validation.types';
import { post } from '@/presentation/contact/mvvm/bff/contact.action';
import { FormKeys } from '@/presentation/contact/mvvm/models/contact.types';

/**
 * バックエンド実行のインターフェース型
 *
 * @param formData - 問い合わせフォームの入力値
 * @returns 正常終了の場合はvoid、差し戻しの場合はバリデーションエラーをBffResultにラップして返す
 */
type Request = {
  (formData: FormData<FormKeys>): Promise<BffResult<void, Violations<FormKeys>>>;
};

/**
 * ServerActions経由バックエンド実行
 */
const _viaAction: Request = async (formData) => {
  return await post(formData);
};

/**
 * RouteHandlers経由バックエンド実行
 */
const viaRoute: Request = async (formData) => {
  const url = '/api/contact/mvvm';
  const { name, email, body } = formData;

  const res = await client.send({
    url,
    method: Method.POST,
    headers: {
      ...CONTENT_TYPE_APPLICATION_JSON_UTF8,
    },
    body: { name, email, body }, // オブジェクトのまま（JSON.stringify不要）で渡す
  });
  return parseBffResult<void, Violations<FormKeys>>(res.rawBody);
};

/**
 * お問い合わせを送信する
 */
export const request: Request = viaRoute;
