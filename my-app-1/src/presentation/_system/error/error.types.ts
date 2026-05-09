//
// カスタムエラー型
//
import { RESULT } from '@/presentation/_system/result/result.core.types';

/**
 * カスタムエラー型
 * Errorオブジェクトを拡張して [ERR_TYPE] プロパティを追加する
 */
export type CustomError<T extends ErrType> = Error & { [ERR_TYPE]: T }; // NOTE: 型の合成

// カスタムエラー固有のプロパティ名をシンボルで定義
export const ERR_TYPE = Symbol.for('MyApp.ErrType');
export const ERR_CODE = Symbol.for('MyApp.ErrCode');
export const RESULT_TYPE = Symbol.for('MyApp.ResultType');

// TODO: BFFのエラー（クライアントの動作を制御する用）とそうでない汎用のエラーの整理
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
     * バックエンドAPI呼び出しにおける予期しないエラー
     */
    ApiError: 'ApiError',

    /**
     * BFF(Route Handler)呼び出しにおける予期しないエラー
     */
    BffError: 'BffError',

    /**
     * ステータスコードによるエラー
     */
    InvalidStatusError: 'InvalidStatusError',
    // HttpResponseError: 'HttpResponseError',
    // ValidationError: 'ValidationError',
    // BackendApiError: 'BackendApiError',

    /**
     * 任意のコードを付与することで、エラーの識別とハンドリングを容易にする汎用エラー型
     */
    CodedError: 'CodedError',
} as const; // 定数オブジェクト
export type ErrType = (typeof ErrType)[keyof typeof ErrType]; // 型

/**
 * バックエンドエラー型
 * CustomErrorに [RESULT_TYPE] プロパティを追加したもの
 */
export type BackendError = CustomError<typeof ErrType.BackendError> & { [RESULT_TYPE]: RESULT }; // NOTE: 型の合成

/**
 * コードエラー型
 * CustomErrorに [ERR_CODE] プロパティを追加したもの
 */
export type CodedError = CustomError<typeof ErrType.CodedError> & { [ERR_CODE]: string }; // NOTE: 型の合成

// TODO: もう少し何とかならないか
export type CustomErrorProperties = { [ERR_TYPE]?: ErrType; [RESULT_TYPE]?: RESULT; [ERR_CODE]?: string };
