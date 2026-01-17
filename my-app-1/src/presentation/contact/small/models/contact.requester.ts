//
// お問い合わせフォーム バックエンド呼び出し
//
import 'client-only';

import client from '@/presentation/_system/client/client.c';
import { CONTENT_TYPE_APPLICATION_JSON_UTF8 } from '@/presentation/_system/client/client.constants';
import { Method } from '@/presentation/_system/client/client.types';
import { parseResult } from '@/presentation/_system/result/result.core.helpers';
import { FormData } from '@/presentation/_system/validation/validation.types';
import { post } from '@/presentation/contact/small/bff/contact.action';
import { ContactResult, FormKeys } from '@/presentation/contact/small/models/contact.types';

/**
 * バックエンド呼び出しのインターフェース型
 *
 * @param formData - 問い合わせフォームの入力値
 * @returns 正常終了の場合はvoid、差し戻しの場合はバリデーションエラーをBffResultにラップして返す
 */
type Send = {
    (formData: FormData<FormKeys>): Promise<ContactResult<FormKeys>>;
};

/**
 * バックエンド呼び出しの実装：ServerActions経由バックエンド呼び出し
 */
const _viaAction: Send = async (formData) => {
    const result = await post(formData);
    // return parseFromResult<FormKeys>(result);
    return result as ContactResult<FormKeys>;
};

/**
 * バックエンド呼び出しの実装：RouteHandlers経由バックエンド呼び出し
 */
const viaRoute: Send = async (formData) => {
    const url = '/api/contact/small';
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
    // return parseFromText<FormKeys>(res.rawBody);
    const result = parseResult(res.rawBody);
    return result as ContactResult<FormKeys>;
};

/**
 * お問い合わせを送信する
 */
export const send: Send = viaRoute;
