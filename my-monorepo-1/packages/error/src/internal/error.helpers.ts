//
// カスタムエラー ヘルパー関数
//
import {
    ApplicationError,
    AuthError,
    CustomErrorBase,
    //CustomError,
    ERR_TYPE,
    ErrType,
    //ResultError,
    RetryableError,
} from '#error/internal/error.types';

/**
 * カスタムエラー 型ガード関数
 */
export function isCustomError(e: unknown): e is CustomErrorBase<ErrType> {
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
