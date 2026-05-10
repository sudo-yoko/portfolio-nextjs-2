//
// カスタムエラーファクトリー
//
import {
    ApplicationError,
    CodedError,
    CustomError,
    ERR_CODE,
    ERR_TYPE,
    ErrType,
    LOCATION,
    RESULT_TYPE,
} from '@/presentation/_system/error/error.types';
import { RESULT } from '@/presentation/_system/result/result.core.types';

/**
 * カスタムエラーを生成する
 */
// TODO; _internalに移動して直接利用不可にする
export function customError<T extends ErrType>({
    type,
    location,
    message,
    cause,
    result,
    code,
}: {
    type: T;
    location?: string;
    message?: string;
    cause?: unknown;
    result?: RESULT;
    code?: string;
}): CustomError<T> {
    // Errorインスタンスを作成
    // const base = new Error(`${type}: ${message ?? ''}`, { cause });
    const base = new Error(message ?? '', { cause });
    // Errorインスタンスにプロパティを足す（マージする）
    const error = Object.assign(base, {
        name: type,
        [ERR_TYPE]: type,
        [LOCATION]: location,
        [RESULT_TYPE]: result,
        [ERR_CODE]: code,
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
 * 汎用コードエラーを生成する
 */
export function codedError(code: string, message?: string): CodedError {
    const base = new Error(message);
    const error = Object.assign(base, {
        name: ErrType.CodedError,
        [ERR_TYPE]: ErrType.CodedError,
        [ERR_CODE]: code,
    });
    return error;
}

export function invalidStatusError({
    status,
    body,
}: {
    status?: number;
    body?: string;
}): CustomError<ErrType> {
    const message: string[] = [];
    message.push('Response status error');
    if (status) {
        message.push(`status=${status}`);
    }
    if (body) {
        message.push(`body=${body}`);
    }
    return customError({ type: ErrType.InvalidStatusError, message: message.join(', ') });
}

export function applicationError({
    cause,
    location,
    mname,
    fname,
    result,
    code,
    message,
}: {
    cause?: unknown;
    location?: string;
    mname?: string;
    fname?: string;
    result?: RESULT;
    code?: string;
    message?: string;
}): ApplicationError {
    let locationName = '';
    if (location) {
        locationName = location;
    }
    if (mname && fname) {
        locationName = mname + '#' + fname;
    }
    return customError({
        type: ErrType.ApplicationError,
        location: locationName,
        cause,
        code,
        result,
        message,
    });
}

export function resultError({
    result,
    location,
}: {
    result: RESULT;
    location?: string;
}): CustomError<ErrType> {
    // TODO: 戻りをResultErrorにすると、引数resultが必須のためコンパイルエラーになる
    const message = `RESULT is ${result.tag}.`;
    return customError({ type: ErrType.ResultError, result, message, location });
}

// export function httpResponseError({
//     status,
//     body,
//     description,
//     cause,
// }: {
//     status?: number;
//     body?: string;
//     description?: string;
//     cause?: unknown;
// }): CustomError<ErrType> {
//     const message: string[] = [];
//     message.push(`status=${status}`);
//     if (body) {
//         message.push(`body=${body}`);
//     }
//     if (description) {
//         message.push(`description=${description}`);
//     }
//     return customError({ type: ErrType.HttpResponseError, message: message.join(', '), cause });
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
