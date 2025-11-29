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
 * よく使うラベルを固定値で定義しておく
 */
export const REJECTION_LABELS = {
  /**
   * バリデーションエラー
   */
  VIOLATION: 'violation',
  /**
   * タイムアウト
   */
  TIMEOUT: 'timeout',
} as const;

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

//////////////////////////
// 境界返却値生成ファクトリ
//////////////////////////

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

//////////////////////////
// 型解析、型ガード関数
//////////////////////////

export function parseBffResult<RESULT, REASON>(text: string): BffResult<RESULT, REASON> | null {
  try {
    const parsed = JSON.parse(text);
    return isBffResult<RESULT, REASON>(parsed) ? parsed : null;
  } catch (_e) {
    return null;
  }
}

function isBffResult<RESULT, REASON>(text: unknown): text is BffResult<RESULT, REASON> {
  if (text === null) {
    return false;
  }
  // プリミティブ型の場合
  if (typeof text !== 'object') {
    return false;
  }

  const tag = (text as BffResult<RESULT, REASON>).tag;
  if (tag === 'ok') {
    return true;
  }
  if (tag === 'reject') {
    return true;
  }
  if (tag === 'abort') {
    return true;
  }
  return false;
}

export function isOk<RESULT = void, REASON = never>(
  result: BffResult<RESULT, REASON>,
): result is Ok<RESULT> {
  return result.tag === 'ok';
}

export function isReject<RESULT = void, REASON = never>(
  result: BffResult<RESULT, REASON>,
): result is Rejected<REASON> {
  return result.tag === 'reject';
}

export function isAbort<RESULT = void, REASON = never>(
  result: BffResult<RESULT, REASON>,
): result is Aborted {
  return result.tag === 'abort';
}

export function isComplete<RESULT = void, REASON = never>(
  result: BffResult<RESULT, REASON>,
): result is Completed<RESULT, REASON> {
  return result.tag === 'ok' || result.tag === 'reject';
}
