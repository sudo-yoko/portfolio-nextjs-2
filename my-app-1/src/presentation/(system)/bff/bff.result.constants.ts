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
   * 該当データなし
   */
  NO_DATA: 'no_data',
  /**
   * タイムアウト
   */
  TIMEOUT: 'timeout',
} as const;
