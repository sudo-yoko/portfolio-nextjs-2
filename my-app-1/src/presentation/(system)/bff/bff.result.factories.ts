//////////////////////////
// 境界返却値生成ファクトリ
//////////////////////////

import { Aborted, Completed, Ok, Rejected } from '@/presentation/(system)/bff/bff.result.types';

/**
 * 正常終了を表す返却値オブジェクトを生成する。
 *
 * @typeParam RESULT - 返却するデータの型。返却データが無い場合は void を指定する。
 * 2
 */
export function ok(): Ok<void>; // オーバーロードシグネチャ

/**
 * 正常終了を表す返却値オブジェクトを生成する。
 *
 * @typeParam RESULT - 返却するデータの型。返却データが無い場合は void を指定する。
 */
export function ok<RESULT>(data: RESULT): Ok<RESULT>; // オーバーロードシグネチャ

// 実装シグネチャ
// 実装シグネチャのTSDocは表示されないため書いても無意味
export function ok<RESULT>(data?: RESULT) {
  return data === undefined ? { tag: 'ok' } : { tag: 'ok', data };
}

export function reject(label: string): Rejected<void>;
export function reject<REASON>(label: string, data: REASON): Rejected<REASON>;
export function reject<REASON>(label: string, data?: REASON) {
  return data === undefined ? { tag: 'reject', label } : { tag: 'reject', label, data };
}

export function complete<RESULT = void, REASON = never>(
  status: Ok<RESULT> | Rejected<REASON>,
): Completed<RESULT, REASON> {
  return status;
}

export function abort(cause?: string): Aborted {
  return { tag: 'abort', cause };
}