import { customError } from '#error/internal/error.factories';
import { isCustomError } from '#error/internal/error.helpers';
import { CustomErrorBase, ERR_TYPE, ErrType, EXTRA } from '#error/internal/error.types';

export const RESULT_TYPE = Symbol.for('MyApp.ResultType'); // TODO: RESULT_TYPEではなく、RESULTとかRESULT_INFOとかにする？

export const ResultErrorType = {
    ...ErrType,
    ResultError: 'ResultError',
} as const;
export type ResultErrorType = (typeof ResultErrorType)[keyof typeof ResultErrorType];

export type ResultError = CustomErrorBase<typeof ResultErrorType.ResultError>;

export function resultError(props: { extra: object; location?: string }): ResultError {
    const { extra, location } = props;
    const base = customError({ errType: ResultErrorType.ResultError, location });
    return Object.assign(base, { [EXTRA]: extra });
}

/**
 * RESULTエラー 型ガード関数
 */
export const isResultError = (e: unknown): e is ResultError => {
    return isCustomError(e) && e[ERR_TYPE] === ResultErrorType.ResultError;
};
