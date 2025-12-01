//
// カスタムエラー ヘルパー関数
//
import { CustomError, ErrType } from '@/presentation/(system)/errors/error.types';
import { customError } from './error.factories';
import { BffResult } from '../bff/bff.result.types';
import { isAbort } from '../bff/bff.result.helpers';

/**
 * 種類別カスタムエラー判定ファクトリ
 */
function isErrorOf<T extends ErrType>(type: T) {
  return (e: unknown) => {
    if (e instanceof Error) {
      if ('errType' in e) {
        if ((e as CustomError<T>).errType === type) {
          return true;
        }
      }
    }
    return false;
  };
}

/**
 * ActionError かどうかを判定する
 */
export const isActionError = isErrorOf(ErrType.ActionError);

/**
 * AuthError かどうかを判定する
 */
export const isAuthError = isErrorOf(ErrType.AuthError);

/**
 * RouteError かどうかを判定する
 */
export const isRouteError = isErrorOf(ErrType.RouteError);

/**
 * client-only
 */
export function isBffAuthError(bffResult: BffResult): boolean {
  if (isAbort(bffResult)) {
    if (ErrType.AuthError === bffResult.type) {
      return true;
    }
  }
  return false;
}


/**
 * 
 */
export function bffResultParseError(text: string, message?: string): CustomError<ErrType> {
  const cause: string[] = [];
  if (message) {
    cause.push(message);
  }
  cause.push(text);
  return customError(ErrType.BffResultParseError, cause.join(', '));
}
