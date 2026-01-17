//
// BFF結果オブジェクト ファクトリー
//
import { parseResultError } from '@/presentation/_system/error/error.factories';
import { stringify } from '@/presentation/_system/error/error.helper.stringify';

import { okData, okEmpty } from '@/presentation/_system/result/result.core.factories';
import { parseResult } from '@/presentation/_system/result/result.core.helpers';
import { OkData, OkEmpty } from '@/presentation/_system/result/result.core.types';
import { _BffResult } from './result.bff.types';
// import { Ok } from '@/presentation/(system)/pagination/mvvm/view-models/pagination.reducer';

export function _bffResult<DATA, FIELD extends string>(text: string): _BffResult<DATA, FIELD> {
  try {
    const result = parseResult(text);
    return result as _BffResult<DATA, FIELD>;
  } catch (e) {
    // TODO: BffResult型にパースできませんでした。
    throw parseResultError(text, stringify(e).message);
  }
}

// export function _ok(): OkEmpty;
// export function _ok<DATA>(data: DATA): OkData<DATA>;
// export function _ok<DATA>(data?: DATA): Ok<DATA> {
//   if (data === undefined) {
    // return okEmpty() as Ok<DATA>;
//   } else {
    // return okData(data) as Ok<DATA>;
//   }
// }

/*
作成中
export function bffResult(tag: typeof Tag.Ok): OkEmpty;
export function bffResult<DATA>(tag: typeof Tag.Ok, data: DATA): OkData<DATA>;
export function bffResult<FIELD extends string>(tag: typeof Tag.Invalid, violations: Violations<FIELD>): Invalid<FIELD>;
export function bffResult<ERROR>(tag: typeof Tag.Aborted, error: ERROR): Aborted;
export function bffResult<DATA, FIELD extends string, ERROR>(tag: Tag, body?: DATA | FIELD | ERROR): BffResult<DATA, FIELD> {
  if (tag === Tag.Ok) {
    if (body === undefined) {
      return ok() as BffResult<DATA, FIELD>;
    } else {
      return ok(body) as BffResult<DATA, FIELD>;
    }
  }
  if(tag === Tag.Invalid){
    return invalid(body);
  }
  if(tag === Tag.Aborted){
    return abort(body);
  }
}
*/

// Overload Signature
// /**
//  * 正常終了（返却データなし）を表すオブジェクトを生成する。
//  */
// export function ok(): Ok<void>;
//
// Overload Signature
// /**
//  * 正常終了（返却データあり）を表すオブジェクトを生成する。
//  *
//  * @typeParam RESULT - 返却するデータの型
//  * @param data - 返却するデータ
//  */
// export function ok<RESULT>(data: RESULT): Ok<RESULT>;
//
// Implementation Signature
// /**
//  * 正常終了を表すオブジェクトを生成する。
//  */
//  * @typeParam RESULT - 返却するデータの型
//  * @param data - 返却するデータ
//  * @returns
//  */
// export function ok<RESULT>(data?: RESULT) {
// return data === undefined ? { tag: 'ok' } : { tag: 'ok', data };
// }

// /**
//  * バリデーションエラーを表す型を生成する
//  *
//  * @param violations -
//  * @returns
//  */
// export function invalid<FIELD extends string>(violations: Violations<FIELD>): Invalid<FIELD> {
// return { tag: 'invalid', violations };
// }
//
// /**
//  * 処理の失敗を表すオブジェクトを生成する
//  *
//  * @param cause - 失敗の原因
//  * @returns
//  */
// export function abort({ errType, message }: { errType?: ErrType; message?: string }): Aborted {
// return { tag: 'aborted', errType, message };
// }

// Overload Signature
/**
 * 差し戻し（返却データなし）を表すオブジェクトを生成する。
 */
// export function reject(label: string): Rejected<void>;

// Overload Signature
/**
 * 差し戻し（返却データあり）を表すオブジェクトを生成する。
 */
// export function reject<REASON>(label: string, data: REASON): Rejected<REASON>;

// Implementation Signature
/**
 * 差し戻しを表すオブジェクトを生成する。
 *
 */
// export function reject<REASON>(label: string, data?: REASON) {
// return data === undefined ? { tag: 'reject', label } : { tag: 'reject', label, data };
// }

/**
 * 処理の完走（正常｜差し戻し）を表すオブジェクトを生成する
 *
 */
// export function complete<RESULT = void, REASON = never>(
// status: Ok<RESULT> | Rejected<REASON>,
// ): Completed<RESULT, REASON> {
// return status;
// }
