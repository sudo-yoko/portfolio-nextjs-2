//
// カスタムエラーファクトリー
//
import { BffResult } from '@/presentation/(system)/bff/bff.result.types';
import { BffError, CustomError, ErrType } from '@/presentation/(system)/errors/error.types';
import { ActionResult } from '@/presentation/(system)/types/action-result';
import { Violations } from '@/presentation/(system)/validation/validation.types';

/**
 * カスタムエラーを生成する
 */
export function customError<T extends ErrType>(type: T, message?: string): CustomError<T> {
  const err = new Error(message) as CustomError<T>;
  err.name = type;
  err.errType = type;
  return err;
}
/**
 * 種類別カスタムエラー生成ファクトリ
 */
const errorOfType =
  <T extends ErrType>(type: T, cause?: string) =>
  () =>
    customError(type, cause);

/**
 * AuthError を生成する
 */
export const authError = errorOfType(ErrType.AuthError, '認証エラー');

/**
 * ActionError を生成する
 */
// export const actionError = errorOfType('ActionError', 'An exception occurred in a Server Action.');
export function actionError<T>(result: ActionResult<T>): CustomError<ErrType> {
  const cause: string[] = [];
  cause.push(`abort=${result.abort}`);
  if (result.abort) {
    cause.push(`cause=${result.cause}`);
  }
  if (!result.abort) {
    cause.push(`data=${JSON.stringify(result.data)}`);
  }
  return customError(ErrType.ActionError, cause.join(', '));
}

/**
 * RouteError を生成する
 */
// export const routeError = errorOfType('RouteError', 'An exception occurred in a Route Handler.');
export function routeError(
  status: number,
  meta?: { body?: string; method?: string; route?: string },
): CustomError<ErrType> {
  //const status = res.status;
  //const body = await res.text(); // bodyがjsonとは限らないのでtextで取得する。エラーの場合はhtmlが返ってくることもある
  const cause: string[] = [];
  if (meta?.method) {
    cause.push(`method=${meta.method}`);
  }
  if (meta?.route) {
    cause.push(`route=${meta.route}`);
  }
  cause.push(`status=${status.toString()}`);
  if (meta?.body) {
    cause.push(`body=${meta.body}`);
  }
  return customError(ErrType.RouteError, cause.join(', '));
}

export function validationError<T extends string>(violations: Violations<T>): CustomError<ErrType> {
  const cause = Object.entries(violations)
    .flatMap(([key, value]) => (Array.isArray(value) ? value.map((m: string) => `${m}[${key}]`) : []))
    .join(', ');
  return customError(ErrType.ValidationError, cause);
}

export function backendApiError(cause?: string): CustomError<ErrType> {
  return customError(ErrType.BackendApiError, cause);
}

export function bffError(bffResult: BffResult, message?: string): BffError {
  const err = new Error(message) as BffError;
  err.name = ErrType.BffError;
  err.bffResult = bffResult;
  return err;
}
