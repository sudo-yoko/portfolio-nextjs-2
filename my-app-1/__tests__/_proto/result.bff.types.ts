//
// BFFのRESULT型（BFFの処理結果を返す際の統一的な返却フォーマット）
//
import {
  Aborted,
  Invalid,
  OkData,
  OkEmpty,
  Retryable,
} from '@/presentation/_system/result/result.core.types';

/**
 * 正常終了を表す型
 *
 * @typeParam RESULT - BFFが返却するデータの型。返却データが無い場合は void を指定する。
 */
// export type Ok<RESULT = void> = [RESULT] extends [void] ? { tag: 'ok' } : { tag: 'ok'; data: RESULT };
export type _Ok<DATA = void> = [DATA] extends [void] ? OkEmpty : OkData<DATA>;

/**
 * バリデーションエラーを表す型
 */
// export type Invalid<FIELD extends string> = { tag: 'invalid'; violations: Violations<FIELD> };

/**
 * 処理の失敗（続行不可能なエラー）を表す型
 */
// export type Aborted = { tag: 'abort'; errType?: ErrType; message?: string };

/**
 * すべての型（正常終了｜バリデーションエラー｜失敗）を包括して総称するユニオン型
 */
// export type BffResult<RESULT = void, REASON = never> = Ok<RESULT> | Rejected<REASON> | Aborted;
export type _BffResult<DATA = void, FIELD extends string = never> =
  | _Ok<DATA>
  | Invalid<FIELD>
  | Retryable
  | Aborted;

/**
 * 差し戻し（バリデーションエラーなどの再試行可能な戻り）を表す型
 */
// TODO: BFFが複数の差し戻し状態を返すようになると複雑になって難しくなるのでこれは使用しない
// export type Rejected<REASON = never> = [REASON] extends [never]
// ? { tag: 'reject'; label: string }
// : { tag: 'reject'; label: string; data: REASON };

/**
 * 処理の完走（正常｜差し戻し）を包括して総称するユニオン型
 */
// export type Completed<RESULT = void, REASON = never> = Ok<RESULT> | Rejected<REASON>;
