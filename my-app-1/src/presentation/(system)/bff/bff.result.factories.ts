//
// BFF結果オブジェクト ファクトリー関数
//
import { Aborted, Completed, Ok, Rejected } from '@/presentation/(system)/bff/bff.result.types';

// Overload Signature
/**
 * 正常終了（返却データなし）を表すオブジェクトを生成する。
 */
export function ok(): Ok<void>;

// Overload Signature
/**
 * 正常終了（返却データあり）を表すオブジェクトを生成する。
 *
 * @typeParam RESULT - 返却するデータの型
 * @param data - 返却するデータ
 */
export function ok<RESULT>(data: RESULT): Ok<RESULT>;

// Implementation Signature
/**
 * 正常終了を表すオブジェクトを生成する。
 *
 * @typeParam RESULT - 返却するデータの型
 * @param data - 返却するデータ
 * @returns
 */
export function ok<RESULT>(data?: RESULT) {
  return data === undefined ? { tag: 'ok' } : { tag: 'ok', data };
}

// Overload Signature
/**
 * 差し戻し（返却データなし）を表すオブジェクトを生成する。
 *
 * @param label - 差し戻しの理由
 */
export function reject(label: string): Rejected<void>;

// Overload Signature
/**
 * 差し戻し（返却データあり）を表すオブジェクトを生成する。
 *
 * @typeParam REASON - 返却するデータの型
 * @param label - 差し戻しの理由
 * @param data - 返却データ
 */
export function reject<REASON>(label: string, data: REASON): Rejected<REASON>;

// Implementation Signature
/**
 * 差し戻しを表すオブジェクトを生成する。
 *
 * @param label - 差し戻しの理由
 * @param data - 返却データ
 * @returns
 */
export function reject<REASON>(label: string, data?: REASON) {
  return data === undefined ? { tag: 'reject', label } : { tag: 'reject', label, data };
}

/**
 * 処理の完走（正常｜差し戻し）を表すオブジェクトを生成する
 *
 * @param status - 正常終了｜差し戻し
 * @returns
 */
export function complete<RESULT = void, REASON = never>(
  status: Ok<RESULT> | Rejected<REASON>,
): Completed<RESULT, REASON> {
  return status;
}

/**
 * 処理の失敗を表すオブジェクトを生成する
 *
 * @param cause - 失敗の原因
 * @returns
 */
export function abort(cause?: string): Aborted {
  return { tag: 'abort', cause };
}
