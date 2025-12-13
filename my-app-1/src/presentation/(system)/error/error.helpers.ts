//
// カスタムエラー ヘルパー関数
//
import { CUSTOM_ERROR_TAG, CustomError, ErrType } from '@/presentation/(system)/error/error.types';

/**
 * カスタムエラー判定
 */
export function isCustomError(e: unknown): e is CustomError<ErrType> {
  if (e instanceof Error) {
    if (CUSTOM_ERROR_TAG in e) {
      return true;
    }
  }
  return false;
}

/**
 * 種類別カスタムエラー判定関数を生成する
 */
function isErrorOf<T extends ErrType>(type: T) {
  return (e: unknown): e is CustomError<T> => {
    if (e instanceof Error) {
      if (CUSTOM_ERROR_TAG in e) {
        if ((e as CustomError<ErrType>)[CUSTOM_ERROR_TAG] === type) {
          return true;
        }
      }
    }
    return false;
  };
}

/**
 * AuthError かどうかを判定する
 */
export const isAuthError = isErrorOf(ErrType.AuthError);

/**
 * client-only
 */
// export function isBffAuthError(bffResult: BffResult): boolean {
  // if (isAbort(bffResult)) {
    // if (ErrType.AuthError === bffResult.type) {
      // return true;
    // }
  // }
  // return false;
// }
