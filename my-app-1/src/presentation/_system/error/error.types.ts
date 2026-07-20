//
// カスタムエラー型
//
import { RESULT } from '@/presentation/_system/result/result.types';

// カスタムエラー固有のプロパティ名をシンボルで定義
export const ERR_TYPE = Symbol.for('MyApp.ErrType');
export const ERR_CODE = Symbol.for('MyApp.ErrCode');
export const RESULT_TYPE = Symbol.for('MyApp.ResultType'); // TODO: RESULT_TYPEではなく、RESULTとかRESULT_INFOとかにする？
export const LOCATION = Symbol.for('MyApp.Location'); // エラー箇所
export const EXTRA = Symbol.for('MyApp.extra'); // 付随情報（何でも）

/**
 * カスタムエラー固有のプロパティを保持するオブジェクト型
 */
// TODO: もう少し何とかならないか
export type CustomErrorProperties = {
    errType?: ErrType;
    code?: string;
    result?: RESULT;
    location?: string;
    extra?: object;
};

// TODO: BFFのエラー（クライアントの動作を制御する用）とそうでない汎用のエラーの整理
/**
 * カスタムエラーの種類
 */
export const ErrType = {
    AuthError: 'AuthError',
    ApplicationError: 'ApplicationError',
    ResultError: 'ResultError',
    RetryableError: 'RetryableError',
    InvalidStatusError: 'InvalidStatusError',
} as const; // 定数オブジェクト
export type ErrType = (typeof ErrType)[keyof typeof ErrType]; // 型

/**
 * カスタムエラー基本型
 */
export type CustomErrorBase<T extends ErrType> = Error & {
    [ERR_TYPE]: T;
    [LOCATION]?: string;
    [EXTRA]?: object;
}; // NOTE: 型の合成

// 種類別カスタムエラー // NOTE: 交差型
export type AuthError = CustomErrorBase<typeof ErrType.AuthError>;
export type InvalidStatusError = CustomErrorBase<typeof ErrType.InvalidStatusError>;
export type RetryableError = CustomErrorBase<typeof ErrType.RetryableError>;
export type ApplicationError = CustomErrorBase<typeof ErrType.ApplicationError> & {
    [RESULT_TYPE]?: RESULT;
    [ERR_CODE]?: string;
};
export type ResultError = CustomErrorBase<typeof ErrType.ResultError> & { [RESULT_TYPE]: RESULT };

// カスタムエラー統合型 // NOTE: ユニオン型
export type CustomError = AuthError | InvalidStatusError | RetryableError | ApplicationError | ResultError;
