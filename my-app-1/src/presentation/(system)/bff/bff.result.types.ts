//
// BFFの返却形式を統一するインターフェース型
//

//////////////////////////
// 境界返却値
//////////////////////////

/**
 * BFF処理の正常終了を表す型
 *
 * @typeParam RESULT - BFFが返却するデータの型。返却データが無い場合は void を指定する。
 */
export type Ok<RESULT = void> = [RESULT] extends [void] ? { tag: 'ok' } : { tag: 'ok'; data: RESULT };

/**
 * BFF処理の差し戻しを表す型。バリデーションエラーなどの再試行可能な
 *
 * @typeParam REASON - 返却するデータの型。省略可能。
 */
export type Rejected<REASON = never> = [REASON] extends [never]
  ? { tag: 'reject'; label: string }
  : { tag: 'reject'; label: string; data: REASON };

  /**
 * 処理の失敗
 */
export type Aborted = { tag: 'abort'; cause?: string };

/**
 * 境界返却値のユニオン型
 *
 * 正常終了｜差し戻し｜失敗
 */
export type BffResult<RESULT = void, REASON = never> = Ok<RESULT> | Rejected<REASON> | Aborted;

/**
 * 境界返却値のユニオン型
 *
 * 処理の完走（正常｜差し戻し）
 */
export type Completed<RESULT = void, REASON = never> = Ok<RESULT> | Rejected<REASON>;
