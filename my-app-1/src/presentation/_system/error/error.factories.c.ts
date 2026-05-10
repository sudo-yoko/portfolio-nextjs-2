import 'client-only';

import { customError } from '@/presentation/_system/error/error.factories';
import {
    BackendError,
    CustomError,
    ERR_TYPE,
    ErrType,
    LOCATION,
    RESULT_TYPE,
} from '@/presentation/_system/error/error.types';
import { RESULT } from '@/presentation/_system/result/result.core.types';

/**
 * BackendError を生成する
 */
// TODO: クライアント側で使用するエラー
export function backendError({
    result,
    location,
    msg,
}: {
    result: RESULT;
    location?: string;
    msg?: string;
}): BackendError {
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
        [LOCATION]: location,
    });
    return error;
}
