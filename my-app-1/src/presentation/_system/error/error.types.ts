//
// カスタムエラー型
//
import { RESULT } from '@/presentation/_system/result/result.core.types';

/**
 * カスタムエラー型
 * Errorオブジェクトを拡張して [ERR_TYPE] プロパティを追加する
 */
export type CustomErrorBase<T extends ErrType> = Error & { [ERR_TYPE]: T; [LOCATION]?: string }; // NOTE: 型の合成

// カスタムエラー固有のプロパティ名をシンボルで定義
export const ERR_TYPE = Symbol.for('MyApp.ErrType');
export const ERR_CODE = Symbol.for('MyApp.ErrCode');
// TODO: RESULT_TYPEではなく、RESULTとかRESULT_INFOとかにする？
export const RESULT_TYPE = Symbol.for('MyApp.ResultType');
export const LOCATION = Symbol.for('MyApp.Location'); // エラー箇所

// TODO: BFFのエラー（クライアントの動作を制御する用）とそうでない汎用のエラーの整理
/**
 * カスタムエラーの種類
 */
export const ErrType = {
    AuthError: 'AuthError',
    ApplicationError: 'ApplicationError',
    ResultError: 'ResultError',
    // BackendError: 'BackendError',
    // ParseResultError: 'ParseResultError',
    RetryableError: 'RetryableError',

    /**
     * ステータスコードによるエラー
     */
    InvalidStatusError: 'InvalidStatusError',
    // HttpResponseError: 'HttpResponseError',
    // ValidationError: 'ValidationError',

    /**
     * 任意のコードを付与することで、エラーの識別とハンドリングを容易にする汎用エラー型
     */
    // CodedError: 'CodedError',
} as const; // 定数オブジェクト
export type ErrType = (typeof ErrType)[keyof typeof ErrType]; // 型

/**
 * バックエンドエラー型
 * CustomErrorに [RESULT_TYPE] プロパティを追加したもの
 */
// export type BackendError = CustomErrorBase<typeof ErrType.BackendError> & { [RESULT_TYPE]?: RESULT }; // NOTE: 型の合成

/**
 * コードエラー型
 * CustomErrorに [ERR_CODE] プロパティを追加したもの
 */
// export type CodedError = CustomErrorBase<typeof ErrType.CodedError> & { [ERR_CODE]: string }; // NOTE: 型の合成

// TODO: もう少し何とかならないか
export type CustomErrorProperties = {
    errType?: ErrType;
    location?: string;
    result?: RESULT;
    code?: string;
};

// カスタムエラー 交差型定義
export type AuthError = CustomErrorBase<typeof ErrType.AuthError>;
export type InvalidStatusError = CustomErrorBase<typeof ErrType.InvalidStatusError>;
export type RetryableError = CustomErrorBase<typeof ErrType.RetryableError>;
export type ApplicationError = CustomErrorBase<typeof ErrType.ApplicationError> & {
    [RESULT_TYPE]?: RESULT;
    [ERR_CODE]?: string;
};
export type ResultError = CustomErrorBase<typeof ErrType.ResultError> & { [RESULT_TYPE]: RESULT };

// カスタムエラー ユニオン型定義
export type CustomError = AuthError | InvalidStatusError | RetryableError | ApplicationError | ResultError;
