//
// お問い合わせフォームRESULT型 ライブラリ
//
import { parseBffResultError } from '@/presentation/(system)/error/error.factories';
import { stringify } from '@/presentation/(system)/error/error.helper.stringify';
import {
  isAborted,
  isInvalid,
  isOkEmpty,
  isRetryable,
  parseResult,
} from '@/presentation/(system)/result/result.core.helpers';
import {
  Aborted,
  Invalid,
  OkEmpty,
  RESULT,
  Retryable,
} from '@/presentation/(system)/result/result.core.types';

/**
 * お問い合わせフォームのRESULT型
 */
export type ContactResult<FIELD extends string = never> = OkEmpty | Invalid<FIELD> | Retryable | Aborted;

/**
 * お問い合わせフォームのRESULT型にパースする
 */
export function parseFromText<FIELD extends string>(text: string): ContactResult<FIELD> {
  try {
    const result = parseResult(text);
    return parseFromResult(result);
  } catch (e) {
    // TODO: BffResult型にパースできませんでした。
    throw parseBffResultError(text, stringify(e).message);
  }
}

/**
 * お問い合わせフォームのRESULT型にパースする
 */
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
  // TODO: BffResult型にパースできませんでした。
  throw parseBffResultError(JSON.stringify(result));
}
