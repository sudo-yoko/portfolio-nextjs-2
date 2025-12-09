//
// カスタムエラーファクトリー
//
import { BffResult } from '@/presentation/(system)/result/result.bff.types';
import {
  BFF_RESULT,
  BffError,
  CUSTOM_ERROR_TAG,
  CustomError,
  ErrType,
} from '@/presentation/(system)/errors/error.types';
import { ActionResult } from '@/presentation/(system)/types/action-result';
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
 * ActionError を生成する
 */
export function actionError<T>(result: ActionResult<T>): CustomError<ErrType> {
  const message: string[] = [];
  message.push('An exception occurred in a Server Action.');
  message.push(`actionResult=${JSON.stringify(result)}`);
  return customError(ErrType.ActionError, message.join(', '));
}

/**
 * RouteError を生成する
 */
export function routeError(
  status: number,
  meta?: { body?: string; method?: string; route?: string },
): CustomError<ErrType> {
  const message: string[] = [];
  message.push('An exception occurred in a Route Handler.');
  message.push(`status=${status}`);
  if (meta) {
    message.push(`${JSON.stringify(meta)}`);
  }
  return customError(ErrType.RouteError, message.join(', '));
}

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
export function bffError(bffResult: BffResult, msg?: string): BffError {
  const message: string[] = [];
  message.push('バックエンドエラー');
  if (msg) {
    message.push(msg);
  }
  message.push(`bffResult=${JSON.stringify(bffResult)}`);

  const base = new Error(`${ErrType.BffError}: ${message.join(', ')}`);
  const error = Object.assign(base, {
    [CUSTOM_ERROR_TAG]: ErrType.BffError,
    [BFF_RESULT]: bffResult,
  });
  return error;
}

// export function bffError(bffResult: BffResult, message?: string): BffError {
// const err = new Error(message) as BffError;
// err.name = ErrType.BffError;
// err[BFF_RESULT] = bffResult;
// return err;
// }
