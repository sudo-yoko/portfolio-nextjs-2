import { BffResult } from '@/presentation/(system)/bff/bff.result.types';

/**
 * カスタムエラーの種類
 * - ActionError      - Server Actions でエラーが発生したことを示すカスタムエラー
 * - AuthError        - 認証エラーが発生したことを示すカスタムエラー
 * - RouteError       - Route Handlers でエラーが発生したことを示すカスタムエラー
 * - ValidationError  - BFF
 */
// 定数オブジェクト
export const ErrType = {
  ActionError: 'ActionError',
  AuthError: 'AuthError',
  RouteError: 'RouteError',
  ValidationError: 'ValidationError',
  BffError: 'BffError',
  BackendApiError: 'BackendApiError',
  BffResultParseError: 'BffResultParseError',
} as const;
// 型
export type ErrType = (typeof ErrType)[keyof typeof ErrType];

/**
 * カスタムエラーの型。
 * ErrorインスタンスにERR_TYPEプロパティを追加したもの
 */
export type CustomError<T extends ErrType> = Error & { errType: T };

// カスタムエラー
export type BffError = CustomError<typeof ErrType.BffError> & { bffResult: BffResult };
