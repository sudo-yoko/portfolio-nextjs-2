//
// BFF結果オブジェクト 固定値定義
//

/**
 * 差し戻しの理由。よく使うラベルを固定値で定義しておく
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
