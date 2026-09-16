import { Aborted, Invalid, OkEmpty, Retryable } from '@/presentation/_system/result/result.types';
import { SearchParam } from '@/presentation/_system/types/search-params.next';

/**
 * クエリパラメータ
 */
export type ContactParams = {
    category?: SearchParam;
    from?: SearchParam;
};

/**
 * 入力フォームのキー
 * お名前、メールアドレス、お問い合わせ内容
 */
// export type FormKeys = 'name' | 'email' | 'body';
export const FormKeys = {
    name: 'name',
    email: 'email',
    zipcode: 'zipcode',
    address1: 'address1',
    address2: 'address2',
    body: 'body',
} as const;
export type FormKeys = (typeof FormKeys)[keyof typeof FormKeys];

/**
 * お問い合わせ入力内容
 */
// export type ContactBody = {
//     name: string;
//     email: string;
//     zipcode?: string;
//     address1?: string;
//     address2?: string;
//     body: string;
// };

// /**
//  * Route Handlerで受け取る値
//  */
// // TODO: これは共通? -> ボディが無いルートもある
// export type RouteContext = {
//     body: ContactBody;
// };

/**
 * お問い合わせフォームのRESULT型
 */
export type ContactResult<FIELD extends string = never> = OkEmpty | Invalid<FIELD> | Retryable | Aborted;
