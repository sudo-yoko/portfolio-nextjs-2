import { Aborted, RESULT, Retryable } from '@my/result';

/**
 * 共通エラーハンドリングで返す可能性のあるRESULT型
 */
// TODO: 名前をAspectResultにするか
export type AopResult = Aborted | Retryable;

export type BffResult<T extends RESULT> = T | AopResult;

/**
 * アスペクト関数の型
 */
export type Aspect = <T>(thunk: () => T) => () => T;

/**
 * アスペクト関数の型（非同期版）
 */
export type AspectAsync = <T>(thunk: () => Promise<T>) => () => Promise<T>;
