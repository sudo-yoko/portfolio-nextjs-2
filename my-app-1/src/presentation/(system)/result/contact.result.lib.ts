//
// お問い合わせフォームRESULT型 ライブラリ
//
import { Aborted, Invalid, OkEmpty, Retryable } from '@/presentation/(system)/result/result.core.types';

/**
 * お問い合わせフォームのRESULT型
 */
export type ContactResult<FIELD extends string = never> = OkEmpty | Invalid<FIELD> | Retryable | Aborted;

/*
export function parseFromText<FIELD extends string>(text: string): ContactResult<FIELD> {
  try {
    const result = parseResult(text);
    return parseFromResult(result);
  } catch (e) {
    TODO: BffResult型にパースできませんでした。
    throw parseResultError(text, stringify(e).message);
  }
}

export function parseFromResult<FIELD extends string>(result: RESULT): ContactResult<FIELD> {
  if (isOkEmpty(result)) {
    return result;
  }
  if (isInvalid<FIELD>(result)) {
    return result;
  }
  if (isRetryable(result)) {
    return result;
  }
  if (isAborted(result)) {
    return result;
  }
  TODO: BffResult型にパースできませんでした。
  throw parseResultError(JSON.stringify(result));
}
  */
