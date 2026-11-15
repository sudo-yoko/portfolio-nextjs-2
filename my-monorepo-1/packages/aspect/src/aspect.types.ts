import { Aborted, Retryable } from '@my/result';

/**
 * 共通エラーハンドリングで返す可能性のあるRESULT型
 */
// TODO: 名前をAspectResultにするか
export type AopResult = Aborted | Retryable;
