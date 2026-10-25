import { customError } from '#error/internal/error.factories';
import { isCustomError } from '#error/internal/error.helpers';
import { CustomErrorBase, ERR_TYPE, ErrType } from '#error/internal/error.types';
import { RESULT } from '@/presentation/_system/result/result.types';

export const RESULT_TYPE = Symbol.for('MyApp.ResultType'); // TODO: RESULT_TYPEではなく、RESULTとかRESULT_INFOとかにする？

export const ResultErrorType = {
    ...ErrType,
    ResultError: 'ResultError',
} as const;
export type ResultErrorType = (typeof ResultErrorType)[keyof typeof ResultErrorType];

export type ResultError = CustomErrorBase<typeof ResultErrorType.ResultError> & {
    [RESULT_TYPE]: RESULT;
};

export function resultError(props: { result: RESULT; location?: string }): ResultError {
    const { result, location } = props;
    const base = customError({ errType: ErrType.ResultError, location });
    return Object.assign(base, { [RESULT_TYPE]: result });
}

/**
 * RESULTエラー 型ガード関数
 */
export const isResultError = (e: unknown): e is ResultError => {
    return isCustomError(e) && e[ERR_TYPE] === ErrType.ResultError;
};
