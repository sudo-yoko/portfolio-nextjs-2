//
// カスタムエラー ヘルパー関数
//
import {
    ApplicationError,
    AuthError,
    CustomError,
    ERR_TYPE,
    ErrType,
    ResultError,
    RetryableError,
} from '@/presentation/_system/error/error.types';

/**
 * カスタムエラー 型ガード関数
 */
export function isCustomError(e: unknown): e is CustomError {
    if (e instanceof Error) {
        if (ERR_TYPE in e) {
            return true;
        }
    }
    return false;
}

// 種類別カスタムエラー判定
/**
 * 認証エラー 型ガード関数
 */
export const isAuthError = (e: unknown): e is AuthError => {
    return isCustomError(e) && e[ERR_TYPE] === ErrType.AuthError;
};

/**
 * リトライ可能エラー 型ガード関数
 */
export const isRetryableError = (e: unknown): e is RetryableError => {
    return isCustomError(e) && e[ERR_TYPE] === ErrType.RetryableError;
};

/**
 * アプリケーションエラー 型ガード関数
 */
export const isApplicationError = (e: unknown): e is ApplicationError => {
    return isCustomError(e) && e[ERR_TYPE] === ErrType.ApplicationError;
};

/**
 * RESULTエラー 型ガード関数
 */
export const isResultError = (e: unknown): e is ResultError => {
    return isCustomError(e) && e[ERR_TYPE] === ErrType.ResultError;
};

// /**
//  * 種類別カスタムエラー判定関数を返す
//  */
// function isErrorOf<T extends ErrType>(type: T) {
//     return (e: unknown): e is T => {
//         if (isCustomError(e)) {
//             if (e[ERR_TYPE] === type) {
//                 return true;
//             }
//         }
//         return false;
//     };
// }

// // 種類別カスタムエラー判定関数
// export const isAuthError = isErrorOf(ErrType.AuthError);
// export const isRetryableError = isErrorOf(ErrType.RetryableError);
// export const isApplicationError = isErrorOf(ErrType.ApplicationError);
// export const isResultError = isErrorOf(ErrType.ResultError);
