//
// ページネーションRESULT型 ライブラリ
//
import { Aborted, Invalid, OkData } from '@/presentation/(system)/result/result.core.types';

/**
 * ページネーションのRESULT型
 */
export type PaginationResult<DATA, FIELD extends string = never> = OkData<DATA> | Invalid<FIELD> | Aborted;

/*
export function parseFromText<DATA, FIELD extends string>(text: string): PaginationResult<DATA, FIELD> {
  let result: RESULT;
  try {
    result = parseResult(text);
  } catch (e) {
    TODO: BffResult型にパースできませんでした。
    throw parseResultError(
      text,
      `PaginationResult<DATA, FIELD>型にパースできませんでした。${stringify(e).message}`,
    );
  }
  return parseFromResult(result);
}


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
   TODO: BffResult型にパースできませんでした。
  throw parseResultError(JSON.stringify(result), `PaginationResult<DATA, FIELD>型にパースできませんでした。`);
}

export function parsePaginationResult(input: RESULT | string) {
  let result: RESULT;
  if (typeof input === 'string') {
    try {
      result = parseResult(input);
    } catch (e) {
      TODO: BffResult型にパースできませんでした。
      throw parseResultError(input, `${stringify(e).message}`);
    }
  } else {
    result = input;
  }
  if (isOkData(result)) {
    return okData(result.data);
  }
  if (isInvalid(result)) {
    return result;
  }
  if (isAborted(result)) {
    return result;
  }
   TODO: BffResult型にパースできませんでした。
  throw parseResultError(JSON.stringify(result), `PaginationResult<DATA, FIELD>型にパースできませんでした。`);
}
*/
