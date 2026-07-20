import { Aborted, Retryable } from '@/presentation/_system/result/result.types';

/**
 * 共通エラーハンドリングで返す可能性のあるRESULT型
 */
// TODO: 名前をAspectResultにするか
export type AopResult = Aborted | Retryable;
