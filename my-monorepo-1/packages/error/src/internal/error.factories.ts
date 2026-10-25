//
// カスタムエラーファクトリー
//
import { isCustomError } from '#error/internal/error.helpers';
import {
    ApplicationError,
    AuthError,
    CAUSES,
    CustomErrorBase,
    ERR_CODE,
    ERR_TYPE,
    ErrType,
    EXTRA,
    InvalidStatusError,
    LOCATION,
    RetryableError,
} from '#error/internal/error.types';

export function customError<T extends ErrType>(props: {
    message?: string;
    cause?: unknown;
    errType: T;
    location?: string;
    extra?: object;
}): CustomErrorBase<T> {
    const { message, cause, errType, location, extra } = props;
    const base = new Error(message, { cause });
    const causes: object[] = [];
    if (isCustomError(cause)) {
        const { message, name, [ERR_TYPE]: errType, [LOCATION]: location, [EXTRA]: extra } = cause;
        causes.push({ message, name, customError: { errType, location, extra } });
        if (cause[CAUSES]) {
            causes.push(...cause[CAUSES]);
        }
    }
    return Object.assign(base, {
        [ERR_TYPE]: errType,
        [LOCATION]: location,
        [EXTRA]: extra,
        [CAUSES]: causes,
    });
}

// TODO: ファクトリー関数を共通化できないか
export function authError(props: { cause?: unknown; location?: string } = {}): AuthError {
    const { cause, location } = props;
    const message = '認証エラー';
    return customError({ message, cause, errType: ErrType.AuthError, location });
}

export function invalidStatusError(
    props: { status?: number; body?: string; location?: string } = {},
): InvalidStatusError {
    const { status, body, location } = props;
    const message: string[] = [];
    message.push('Response status error');
    if (status) {
        message.push(`status=${status}`);
    }
    if (body) {
        message.push(`body=${body}`);
    }
    return customError({
        message: message.join(', '),
        errType: ErrType.InvalidStatusError,
        location,
        extra: { status, body },
    });
}

export function retryableError(props: { message?: string; location?: string } = {}): RetryableError {
    const { message, location } = props;
    const cause: string[] = [];
    cause.push('再試行可能エラー');
    if (message) {
        cause.push(message);
    }
    return customError({ message: cause.join(', '), errType: ErrType.RetryableError, location });
}

export function applicationError(
    props: {
        /** キャッチしたエラー */
        cause?: unknown;
        //result?: RESULT;
        code?: string;
        /** エラーをキャッチした場所 */
        location?: string;
        message?: string;
        /** その他何でも */
        extra?: object;
    } = {},
): ApplicationError {
    const { cause, code, location, message, extra } = props;
    const base = customError({ message, cause, errType: ErrType.ApplicationError, location, extra });
    return Object.assign(base, { [ERR_CODE]: code });
}

