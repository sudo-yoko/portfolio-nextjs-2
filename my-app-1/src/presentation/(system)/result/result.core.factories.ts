//
// RESULT型 生成ファクトリ―
//
import { ErrType } from '@/presentation/(system)/error/error.types';
import {
    Aborted,
    Invalid,
    OkData,
    OkEmpty,
    Retryable,
    Tag,
} from '@/presentation/(system)/result/result.core.types';
import { Violations } from '@/presentation/(system)/validation/validation.types';

// export function ok(): OkEmpty;
// export function ok<DATA>(data: DATA): OkData<DATA>;
// export function ok<DATA>(data?: DATA): OkEmpty | OkData<DATA> {
// return data === undefined ? okEmpty() : okData(data);
// }

export function okEmpty(): OkEmpty {
    return { tag: Tag.OkEmpty };
}

export function okData<DATA>(data: DATA): OkData<DATA> {
    return { tag: Tag.OkData, data };
}

/**
 * バリデーションエラーを表すオブジェクトを生成する
 *
 * @param violations -
 * @returns
 */
export function invalid<FIELD extends string>(violations: Violations<FIELD>): Invalid<FIELD> {
    return { tag: Tag.Invalid, violations };
}

/**
 * 再試行可能なエラーを表すオブジェクトを生成する
 */
export function retry(retryMsg?: string[]): Retryable {
    // TODO: メッセージは呼び元で作成するか
    const defaultMsg: string[] = ['エラーが発生しました。', 'しばらく経ってから再実行してください。'];
    return { tag: Tag.Retryable, retryMsg: retryMsg ?? defaultMsg };
}

/**
 * 処理の失敗を表すオブジェクトを生成する
 *
 * @param cause - 失敗の原因
 * @returns
 */
export function abort({ errType, message }: { errType?: ErrType; message?: string }): Aborted {
    return { tag: Tag.Aborted, errType, message };
}
