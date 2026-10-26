import test from 'node:test';

import { customError } from '@/error/src/internal/error.factories';
import { isApplicationError, isCustomError } from '@/error/src/internal/error.helpers';
import { CustomError, ERR_TYPE, ErrType, EXTRA } from '@/error/src/internal/error.types';
import assert from 'node:assert';

// 独自エラーを作成するテスト
export const RESULT_TYPE = Symbol.for('MyApp.ResultType');
export const ResultErrorType = {
    ...ErrType,
    ResultError: 'ResultError'
} as const;
export type ResultErrorType = (typeof ResultErrorType)[keyof typeof ResultErrorType];
export type ResultError = CustomError<typeof ResultErrorType.ResultError>;
export function resultError(props: { extra?: object; location?: string }): ResultError {
    const { extra, location } = props;
    const base = customError({ errType: ResultErrorType.ResultError, location });
    return Object.assign(base, { [EXTRA]: extra });
}
export const isResultError = (e: unknown): e is ResultError => {
    return isCustomError(e) && e[ERR_TYPE] === ResultErrorType.ResultError;
};

// clear & npm run node:test -- --test-name-pattern='^test1-1$' src/error/error.test.ts
void test('test1-1', () => {
    const e = resultError({});

    assert.equal(isCustomError(e), true)
    assert.equal(isResultError(e), true)
    assert.equal(isApplicationError(e), false)
    assert.equal(e[ERR_TYPE] === ResultErrorType.ResultError, true)
});
