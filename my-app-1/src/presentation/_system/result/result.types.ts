//
// RESULT型
// - BFFからクライアントに返す戻り値の型を標準化する
//
import { AopResult } from '@/presentation/_system/aspect/aspect.types';
import { ErrType } from '@/presentation/_system/error/error.types';
import { Violations } from '@/presentation/_system/validation/validation.types';

/**
 * 返却値の分類
 */
export const Tag = {
    /**
     * 正常終了(返却データなし)
     */
    OkEmpty: 'okEmpty',
    /**
     * 正常終了(返却データあり)
     */
    OkData: 'okData',
    /**
     * バリデーションエラー
     */
    Invalid: 'invalid',
    /**
     * 再試行可能なエラー
     */
    Retryable: 'retryable',
    /**
     * 異常終了
     */
    Aborted: 'aborted',
} as const;
export type Tag = (typeof Tag)[keyof typeof Tag];

//
// 交差型で定義
//
// /**
//  * 基本型
//  */
// export type RESULT = { tag: Tag };

// /**
//  * 正常終了（返却データなし）を表す型
//  */
// export type OkEmpty = RESULT & { tag: typeof Tag.OkEmpty };

// /**
//  * 正常終了（返却データあり）を表す型
//  */
// export type OkData<DATA> = RESULT & { tag: typeof Tag.OkData; data: DATA };

// /**
//  * バリデーションエラーを表す型
//  */
// export type Invalid<FIELD extends string> = RESULT & {
//     tag: typeof Tag.Invalid;
//     violations: Violations<FIELD>;
// };

// /**
//  * 再試行可能なエラーを表す型
//  */
// export type Retryable = RESULT & {
//     tag: typeof Tag.Retryable;
//     retryMsg: string[];
// };

// /**
//  * 異常終了を表す型
//  */
// // TODO: RetryableはErrTypeにするか。それ以外のエラー用にエラーコードを付けるか。
// // TODO: CutomErrorやError情報をラップするか
// export type Aborted = RESULT & {
//     tag: typeof Tag.Aborted;
//     errType?: ErrType;
//     code?: string;
//     message?: string;
// };
// TODO: messageはいらないかも。
// RESULT型にセットするメッセージはクライアントに表示するもの（システムメッセージではない）
// -> クライアントでエラーを投げるときにセットするメッセージで使用

//
// ユニオン型で定義
//
export type RESULT = OkEmpty | OkData<unknown> | Invalid<string> | Retryable | Aborted;
export type OkEmpty = { tag: typeof Tag.OkEmpty };
export type OkData<DATA> = { tag: typeof Tag.OkData; data: DATA };
export type Invalid<FIELD extends string> = { tag: typeof Tag.Invalid; violations: Violations<FIELD> };
export type Retryable = { tag: typeof Tag.Retryable; retryMsg: string[] };
export type Aborted = { tag: typeof Tag.Aborted; errType?: ErrType; code?: string; message?: string };

export type BffResult<T extends RESULT> = T | AopResult;
