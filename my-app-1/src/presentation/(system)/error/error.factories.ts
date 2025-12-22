//
// カスタムエラーファクトリー
//
import {
  RESULT_TYPE,
  BffError,
  CUSTOM_ERROR_TAG,
  CustomError,
  ErrType,
} from '@/presentation/(system)/error/error.types';
import { RESULT } from '@/presentation/(system)/result/result.core.types';
import { Violations } from '@/presentation/(system)/validation/validation.types';

/**
 * カスタムエラーを生成する
 */
function customError<T extends ErrType>(type: T, msg?: string): CustomError<T> {
  // Errorインスタンスを作成
  const base = new Error(`${type}: ${msg ?? ''}`);
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
    customError(type, message);

/**
 * AuthErrorを生成する
 */
export const authError = errorOfType(ErrType.AuthError, '認証エラー');

/**
 *
 * ValidationError を生成する
 */
export function validationError<T extends string>(violations: Violations<T>): CustomError<ErrType> {
  const message: string[] = [];
  message.push('検証エラー');
  message.push(`violations=${JSON.stringify(violations)}`);
  return customError(ErrType.ValidationError, message.join(', '));
}

export function backendApiError(message: string): CustomError<ErrType> {
  return customError(ErrType.BackendApiError, message);
}

export function retryableError(message?: string): CustomError<ErrType> {
  const cause: string[] = [];
  cause.push('再試行可能エラー');
  if (message) {
    cause.push(message);
  }
  return customError(ErrType.RetryableError, cause.join(', '));
}

/**
 * ResultParseError を生成する
 */
export function parseResultError(text: string, message?: string): CustomError<ErrType> {
  const cause: string[] = [];
  if (message) {
    cause.push(message);
  }
  cause.push(text);
  return customError(ErrType.ParseResultError, cause.join(', '));
}

/**
 * BffResultParseError を生成する
 */
export function parseBffResultError(text: string, message?: string): CustomError<ErrType> {
  const cause: string[] = [];
  if (message) {
    cause.push(message);
  }
  cause.push(text);
  return customError(ErrType.ParseBffResultError, cause.join(', '));
}

/**
 * BffError を生成する
 */
export function bffError(result: RESULT, msg?: string): BffError {
  const message: string[] = [];
  message.push('バックエンドエラー');
  if (msg) {
    message.push(msg);
  }
  message.push(`bffResult=${JSON.stringify(result)}`);

  const base = new Error(`${ErrType.BffError}: ${message.join(', ')}`);
  const error = Object.assign(base, {
    [CUSTOM_ERROR_TAG]: ErrType.BffError,
    [RESULT_TYPE]: result,
  });
  return error;
}

// export function bffError(bffResult: BffResult, message?: string): BffError {
// const err = new Error(message) as BffError;
// err.name = ErrType.BffError;
// err[BFF_RESULT] = bffResult;
// return err;
// }
