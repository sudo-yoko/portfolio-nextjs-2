import 'server-only';

import { customError } from '@/presentation/_system/error/error.factories';
import { CustomError, ErrType } from '@/presentation/_system/error/error.types';

// TODO: サーバーサイドで使用するエラー
export function apiError({ cause, detail }: { cause?: unknown; detail?: string }): CustomError<ErrType> {
    const message: string[] = [];
    message.push('Backend API call failed.');
    if (detail) {
        message.push(detail);
    }
    return customError({ type: ErrType.ApiError, message: message.join(', '), cause });
}
