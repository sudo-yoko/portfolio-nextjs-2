//
// カスタムエラー ヘルパー関数
//
import { CustomError, ERR_TYPE, ErrType } from '@/presentation/_system/error/error.types';

/**
 * カスタムエラー判定
 */
export function isCustomError(e: unknown): e is CustomError {
    if (e instanceof Error) {
        if (ERR_TYPE in e) {
            return true;
        }
    }
    return false;
}

// export function isBackendError(e: CustomError<ErrType>): e is BackendError {
//     if (isCustomError(e)) {
//         if (RESULT_TYPE in e) {
//             return true;
//         }
//     }
//     return false;
// }

// export function isCodedError(e: CustomError<ErrType>): e is CodedError {
//     if (isCustomError(e)) {
//         if (ERR_CODE in e) {
//             return true;
//         }
//     }
//     return false;
// }

/**
 * 種類別カスタムエラー判定関数を生成する
 */
function isErrorOf<T extends ErrType>(type: T) {
    return (e: unknown): e is CustomError => {
        if (e instanceof Error) {
            if (ERR_TYPE in e) {
                // TODO: isCustomError使えるか
                if ((e as CustomError)[ERR_TYPE] === type) {
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
export const isApplicationError = isErrorOf(ErrType.ApplicationError);
export const isResultError = isErrorOf(ErrType.ResultError);

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
