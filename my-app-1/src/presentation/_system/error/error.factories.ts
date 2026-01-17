//
// カスタムエラーファクトリー
//
import {
    BackendError,
    CUSTOM_ERROR_TAG,
    CustomError,
    ErrType,
    RESULT_TYPE,
} from '@/presentation/_system/error/error.types';
import { RESULT } from '@/presentation/_system/result/result.core.types';

/**
 * カスタムエラーを生成する
 */
function customError<T extends ErrType>({
    type,
    message,
    cause,
}: {
    type: T;
    message?: string;
    cause?: unknown;
}): CustomError<T> {
    // Errorインスタンスを作成
    const base = new Error(`${type}: ${message ?? ''}`, { cause });
    // Errorインスタンスにプロパティを足す（マージする）
    const error = Object.assign(base, {
        [CUSTOM_ERROR_TAG]: type,
    }); // satisfies CustomError<T>;
    return error;
}

/**
 * 種類別カスタムエラー生成ファクトリ
 */
const errorOfType =
    <T extends ErrType>(type: T, message: string) =>
    () =>
        customError({ type, message });

/**
 * AuthErrorを生成する
 */
export const authError = errorOfType(ErrType.AuthError, '認証エラー');

export function retryableError(message?: string): CustomError<ErrType> {
    const cause: string[] = [];
    cause.push('再試行可能エラー');
    if (message) {
        cause.push(message);
    }
    return customError({ type: ErrType.RetryableError, message: cause.join(', ') });
}

/**
 * ResultParseError を生成する
 */
export function parseResultError(text: string, message?: string): CustomError<ErrType> {
    const cause: string[] = [];
    cause.push('RESULT 型にパースできませんでした。');
    cause.push(text);
    if (message) {
        cause.push(message);
    }
    return customError({ type: ErrType.ParseResultError, message: cause.join(', ') });
}

/**
 * BackendError を生成する
 */
export function backendError(result: RESULT, msg?: string): BackendError {
    const message: string[] = [];
    message.push('バックエンドエラー');
    if (msg) {
        message.push(msg);
    }
    message.push(`RESULT=${JSON.stringify(result)}`);

    const base = new Error(`${ErrType.BackendError}: ${message.join(', ')}`);
    const error = Object.assign(base, {
        [CUSTOM_ERROR_TAG]: ErrType.BackendError,
        [RESULT_TYPE]: result,
    });
    return error;
}

/**
 * MalformedResultError を生成する
 */
export function malformedResultError(result: RESULT, msg?: string): CustomError<ErrType> {
    const cause: string[] = [];
    cause.push('RESULTの形式が不正です。');
    if (msg) {
        cause.push(msg);
    }
    cause.push(`RESULT=${JSON.stringify(result)}`);
    return customError({ type: ErrType.MalformedResultError, message: cause.join(', ') });
}

export function httpRequestError({
    cause,
    detail,
}: {
    cause?: unknown;
    detail: string;
}): CustomError<ErrType> {
    const message: string[] = [];
    message.push('HTTPリクエストが失敗しました。');
    if (detail) {
        message.push(detail);
    }
    return customError({ type: ErrType.HttpRequestError, message: message.join(', '), cause });
}

export function httpResponseError({ status, body }: { status: number; body?: string }): CustomError<ErrType> {
    const cause: string[] = [];
    cause.push(`status=${status}`);
    if (body) {
        cause.push(`body=${body}`);
    }
    return customError({ type: ErrType.HttpResponseError, message: cause.join(', ') });
}

// export function bffError(bffResult: BffResult, message?: string): BffError {
// const err = new Error(message) as BffError;
// err.name = ErrType.BffError;
// err[BFF_RESULT] = bffResult;
// return err;
// }
/**
 *
 * ValidationError を生成する
 */
// export function validationError<T extends string>(violations: Violations<T>): CustomError<ErrType> {
// const message: string[] = [];
// message.push('検証エラー');
// message.push(`violations=${JSON.stringify(violations)}`);
// return customError({ type: ErrType.ValidationError, message: message.join(', ') });
// }

// export function backendApiError(message: string): CustomError<ErrType> {
// return customError({ type: ErrType.BackendApiError, message });
// }

/**
 * BffResultParseError を生成する
 */
// export function parseResultError(text: string, message?: string): CustomError<ErrType> {
// const cause: string[] = [];
// if (message) {
// cause.push(message);
// }
// cause.push(text);
// return customError(ErrType.ParseResultError, cause.join(', '));
// }
