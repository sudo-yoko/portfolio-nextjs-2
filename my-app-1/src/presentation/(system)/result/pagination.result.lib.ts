//
// ページネーションRESULT型 ライブラリ
//
import { parseBffResultError } from '@/presentation/(system)/error/error.factories';
import { stringify } from '@/presentation/(system)/error/error.helper.stringify';
import {
  isAborted,
  isInvalid,
  isOkData,
  parseResult,
} from '@/presentation/(system)/result/result.core.helpers';
import { Aborted, Invalid, OkData, RESULT } from '@/presentation/(system)/result/result.core.types';

/**
 * ページネーションのRESULT型
 */
export type PaginationResult<DATA, FIELD extends string = never> = OkData<DATA> | Invalid<FIELD> | Aborted;

/**
 * ページネーションのRESULT型にパースする
 */
export function parseFromText<DATA, FIELD extends string>(text: string): PaginationResult<DATA, FIELD> {
  try {
    const result = parseResult(text);
    return parseFromResult(result);
  } catch (e) {
    // TODO: BffResult型にパースできませんでした。
    throw parseBffResultError(text, stringify(e).message);
  }
}

/**
 * ページネーションのRESULT型にパースする
 */
export function parseFromResult<DATA, FIELD extends string>(result: RESULT): PaginationResult<DATA, FIELD> {
  if (isOkData<DATA>(result)) {
    return result;
  }
  if (isInvalid<FIELD>(result)) {
    return result;
  }
  if (isAborted(result)) {
    return result;
  }
  // TODO: BffResult型にパースできませんでした。
  throw parseBffResultError(JSON.stringify(result));
}
