//
// カスタムエラー型定義
//
import { RESULT } from '@/presentation/(system)/result/result.core.types';

/**
 * カスタムエラーの種類
 */
export const ErrType = {
    AuthError: 'AuthError',
    ValidationError: 'ValidationError',
    BackendError: 'BackendError',
    BackendApiError: 'BackendApiError',
    ParseResultError: 'ParseResultError',
    RetryableError: 'RetryableError',
    MalformedResultError: 'MalformedResultError', // RESULTの形式が不正
} as const; // 定数オブジェクト
export type ErrType = (typeof ErrType)[keyof typeof ErrType]; // 型

// カスタムエラー固有のプロパティ名をシンボルで定義
export const CUSTOM_ERROR_TAG = Symbol.for('MyApp.CustomErrorTag');
export const RESULT_TYPE = Symbol.for('MyApp.ResultType');

/**
 * 基本のカスタムエラー型
 * Errorオブジェクトを拡張して [CUSTOM_ERROR_TAG] プロパティを追加する
 */
export type CustomError<T extends ErrType> = Error & { [CUSTOM_ERROR_TAG]: T }; // 型の合成

/**
 * バックエンドエラー
 * CustomErrorに [RESULT_TYPE] プロパティを追加したもの
 */
export type BackendError = CustomError<typeof ErrType.BackendError> & { [RESULT_TYPE]: RESULT }; // 型の合成
