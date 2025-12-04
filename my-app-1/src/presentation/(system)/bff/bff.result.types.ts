//
// BFF結果オブジェクト 型定義
//
import { ErrType } from '@/presentation/(system)/errors/error.types';

/**
 * 正常終了を表す型
 *
 * @typeParam RESULT - BFFが返却するデータの型。返却データが無い場合は void を指定する。
 */
export type Ok<RESULT = void> = [RESULT] extends [void] ? { tag: 'ok' } : { tag: 'ok'; data: RESULT };

/**
 * 差し戻し（バリデーションエラーなどの再試行可能な戻り）を表す型
 *
 * @typeParam REASON - 返却するデータの型。省略可能。
 */
export type Rejected<REASON = never> = [REASON] extends [never]
  ? { tag: 'reject'; label: string }
  : { tag: 'reject'; label: string; data: REASON };

/**
 * 処理の失敗（続行不可能なエラー）を表す型
 */
export type Aborted = { tag: 'abort'; errType?: ErrType; message?: string };

/**
 * すべての型（正常終了｜差し戻し｜失敗）を包括して総称するユニオン型
 */
export type BffResult<RESULT = void, REASON = never> = Ok<RESULT> | Rejected<REASON> | Aborted;

/**
 * 処理の完走（正常｜差し戻し）を包括して総称するユニオン型
 */
export type Completed<RESULT = void, REASON = never> = Ok<RESULT> | Rejected<REASON>;
