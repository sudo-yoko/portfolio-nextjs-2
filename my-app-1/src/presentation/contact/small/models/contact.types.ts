import { Aborted, Invalid, OkEmpty, Retryable } from '@/presentation/(system)/result/result.core.types';
import { SearchParam } from '@/presentation/(system)/types/search-params';

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
    body: 'body',
} as const;
export type FormKeys = (typeof FormKeys)[keyof typeof FormKeys];

/**
 * お問い合わせ入力内容
 */
export type ContactBody = {
    name: string;
    email: string;
    body: string;
};

/**
 * お問い合わせフォームのRESULT型
 */
export type ContactResult<FIELD extends string = never> = OkEmpty | Invalid<FIELD> | Retryable | Aborted;
