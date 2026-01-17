//
// カスタムエラー型
//
import { RESULT } from '@/presentation/_system/result/result.core.types';

/**
 * カスタムエラー型
 * Errorオブジェクトを拡張して [CUSTOM_ERROR_TAG] プロパティを追加する
 */
export type CustomError<T extends ErrType> = Error & { [CUSTOM_ERROR_TAG]: T }; // 型の合成

// カスタムエラー固有のプロパティ名をシンボルで定義
export const CUSTOM_ERROR_TAG = Symbol.for('MyApp.CustomErrorTag');
export const RESULT_TYPE = Symbol.for('MyApp.ResultType');

/**
 * カスタムエラーの種類
 */
export const ErrType = {
    AuthError: 'AuthError',
    BackendError: 'BackendError',
    ParseResultError: 'ParseResultError',
    RetryableError: 'RetryableError',

    /**
     * RESULTの形式が不正
     */
    MalformedResultError: 'MalformedResultError',

    /**
     * HTTPリクエストの失敗
     */
    HttpRequestError: 'HttpRequestError',

    /**
     * ステータスコードによるエラー
     */
    HttpResponseError: 'HttpResponseError',
    // ValidationError: 'ValidationError',
    // BackendApiError: 'BackendApiError',
} as const; // 定数オブジェクト
export type ErrType = (typeof ErrType)[keyof typeof ErrType]; // 型

/**
 * バックエンドエラー型
 * CustomErrorに [RESULT_TYPE] プロパティを追加したもの
 */
export type BackendError = CustomError<typeof ErrType.BackendError> & { [RESULT_TYPE]: RESULT }; // 型の合成
