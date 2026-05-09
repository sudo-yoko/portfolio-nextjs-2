import 'client-only';

import { customError } from '@/presentation/_system/error/error.factories';
import {
    BackendError,
    CodedError,
    CustomError,
    ERR_CODE,
    ERR_TYPE,
    ErrType,
    RESULT_TYPE,
} from '@/presentation/_system/error/error.types';
import { RESULT } from '@/presentation/_system/result/result.core.types';

// TODO: BffErrorとApiErrorの違い整理
export function bffError({ cause, detail }: { cause?: unknown; detail?: string }): CustomError<ErrType> {
    const message: string[] = [];
    message.push('RouteHandler call failed.');
    if (detail) {
        message.push(detail);
    }
    return customError({ type: ErrType.BffError, message: message.join(', '), cause });
}

/**
 * BackendError を生成する
 */
// TODO: クライアント側で使用するエラー
export function backendError(result: RESULT, msg?: string): BackendError {
    const message: string[] = [];
    message.push('バックエンドエラー');
    if (msg) {
        message.push(msg);
    }
    message.push(`RESULT=${JSON.stringify(result)}`);

    const base = new Error(`${ErrType.BackendError}: ${message.join(', ')}`);
    const error = Object.assign(base, {
        [ERR_TYPE]: ErrType.BackendError,
        [RESULT_TYPE]: result,
    });
    return error;
}


