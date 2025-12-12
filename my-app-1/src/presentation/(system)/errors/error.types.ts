//
// カスタムエラー型定義
//
import { BffResult } from '@/presentation/(system)/result/result.bff.types';

/**
 * カスタムエラーの種類
 */
export const ErrType = {
  AuthError: 'AuthError',
  ValidationError: 'ValidationError',
  BffError: 'BffError',
  BackendApiError: 'BackendApiError',
  ParseResultError: 'ParseResultError',
  ParseBffResultError: 'ParseBffResultError',
} as const; // 定数オブジェクト
export type ErrType = (typeof ErrType)[keyof typeof ErrType]; // 型

// カスタムエラー固有のプロパティ名をシンボルで定義
export const CUSTOM_ERROR_TAG = Symbol.for('MyApp.CustomErrorTag');
export const BFF_RESULT = Symbol.for('MyApp.BffResult');

/**
 * 基本のカスタムエラー型
 * Errorオブジェクトを拡張して [CUSTOM_ERROR_TAG] プロパティを追加する
 */
export type CustomError<T extends ErrType> = Error & { [CUSTOM_ERROR_TAG]: T }; // 型の合成

/**
 * BFFエラー
 * CustomErrorに [BFF_RESULT] プロパティを追加したもの
 */
export type BffError = CustomError<typeof ErrType.BffError> & { [BFF_RESULT]: BffResult }; // 型の合成
