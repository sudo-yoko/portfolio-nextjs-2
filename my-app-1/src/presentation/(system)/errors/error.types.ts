//
// カスタムエラー型定義
//
import { BffResult } from '@/presentation/(system)/bff/bff.result.types';

/**
 * カスタムエラーの種類
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
 * 基本のカスタムエラー型
 * Error型に errType プロパティを追加したもの
 */
export type CustomError<T extends ErrType> = Error & { errType: T }; // 型の合成

/**
 * BFFエラー
 * CustomErrorに bffResult プロパティを追加したもの
 */
export type BffError = CustomError<typeof ErrType.BffError> & { bffResult: BffResult };
