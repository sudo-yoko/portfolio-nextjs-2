//
// カスタムエラー ヘルパー関数
//
import {
    BackendError,
    CodedError,
    CustomError,
    ERR_CODE,
    ERR_TYPE,
    ErrType,
    RESULT_TYPE,
} from '@/presentation/_system/error/error.types';

/**
 * カスタムエラー判定
 */
export function isCustomError(e: unknown): e is CustomError<ErrType> {
    if (e instanceof Error) {
        if (ERR_TYPE in e) {
            return true;
        }
    }
    return false;
}

export function isBackendError(e: CustomError<ErrType>): e is BackendError {
    if (isCustomError(e)) {
        if (RESULT_TYPE in e) {
            return true;
        }
    }
    return false;
}

export function isCodedError(e: CustomError<ErrType>): e is CodedError {
    if (isCustomError(e)) {
        if (ERR_CODE in e) {
            return true;
        }
    }
    return false;
}

/**
 * 種類別カスタムエラー判定関数を生成する
 */
function isErrorOf<T extends ErrType>(type: T) {
    return (e: unknown): e is CustomError<T> => {
        if (e instanceof Error) {
            if (ERR_TYPE in e) {
                if ((e as CustomError<ErrType>)[ERR_TYPE] === type) {
                    return true;
                }
            }
        }
        return false;
    };
}

/**
 * AuthError かどうかを判定する
 */
export const isAuthError = isErrorOf(ErrType.AuthError);

export const isRetryableError = isErrorOf(ErrType.RetryableError);

/**
 * client-only
 */
// export function isBffAuthError(bffResult: BffResult): boolean {
// if (isAbort(bffResult)) {
// if (ErrType.AuthError === bffResult.type) {
// return true;
// }
// }
// return false;
// }
