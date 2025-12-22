//
// RESULT型 ヘルパー関数
//
import { parseResultError } from '@/presentation/(system)/error/error.factories';
import { stringify } from '@/presentation/(system)/error/error.helper.stringify';
import {
  Aborted,
  Invalid,
  OkData,
  OkEmpty,
  RESULT,
  Retryable,
  Tag,
} from '@/presentation/(system)/result/result.core.types';

// function isOk(result: RESULT): result is OkEmpty | OkData<unknown> {
// return result.tag === Tag.Ok;
// }

export function isOkEmpty(result: RESULT): result is OkEmpty {
  // return isOk(result) && !('data' in result);
  return result.tag === Tag.OkEmpty;
}

// 型パラメータを検証していないのでつけるべきではない
// export function isOkData<DATA>(result: RESULT): result is OkData<DATA> {
export function isOkData(result: RESULT): result is OkData<unknown> {
  // return isOk(result) && 'data' in result;
  return result.tag === Tag.OkData;
}

// 型パラメータを検証していないのでつけるべきではない
// export function isInvalid<FIELD extends string>(result: RESULT): result is Invalid<FIELD> {
export function isInvalid(result: RESULT): result is Invalid<string> {
  return result.tag === Tag.Invalid;
}

export function isRetryable(result: RESULT): result is Retryable {
  return result.tag === Tag.Retryable;
}

export function isAborted(result: RESULT): result is Aborted {
  return result.tag === Tag.Aborted;
}

export function parseResult(text: string): RESULT {
  try {
    const parsed = JSON.parse(text);
    if (isResult(parsed)) {
      return parsed;
    }
    throw parseResultError(text);
  } catch (e) {
    throw parseResultError(text, stringify(e).message);
  }
}

function isResult(text: unknown): text is RESULT {
  if (text === null) {
    return false;
  }
  // プリミティブ型の場合
  if (typeof text !== 'object') {
    return false;
  }

  const tag = (text as RESULT).tag;
  if (tag === Tag.OkEmpty) {
    return true;
  }
  if (tag === Tag.OkData) {
    return true;
  }
  if (tag === Tag.Invalid) {
    return true;
  }
  if (tag === Tag.Retryable) {
    return true;
  }
  if (tag === Tag.Aborted) {
    return true;
  }
  return false;
}
