//
// バリデーションのヘルパー関数
//
import { stringify } from '@/presentation/(system)/error/error.helper.stringify';
import logger from '@/presentation/(system)/logging/logger';
import { Violations, ViolationsMap } from '@/presentation/(system)/validation/validation.types';

/**
 * バリデーションエラーの有無を調べる
 */
export function hasError<FIELD extends string>(violations: Violations<FIELD>): boolean {
    return violations.some((vio) => vio.violation.some((str) => str.trim() !== ''));
}
// export function hasError(errors: Violations<string>): boolean {
// export function hasError<T extends string>(errors: Violations<T>): boolean {
// return Object.values(errors).some((err) => (err as string[]).length > 0);
// }

/**
 * Violations型に適合するか調べる
 */
// TODO: 再テスト
export function isViolations(text: string, ...keys: string[]): boolean {
    try {
        // JSONにパースできること
        const parsed = JSON.parse(text);
        for (const [key, value] of Object.entries(parsed)) {
            // 値がstring[]であること
            if (!Array.isArray(value)) {
                return false;
            }
            // キーの配列も渡せる場合はキーのチェックも行う
            if (keys.length > 0 && !keys.includes(key)) {
                return false;
            }
        }
        return true;
    } catch (e) {
        logger.debug(stringify(e).message);
        return false;
    }
}

/**
 * Violationsをマップド型に変換する
 */
export function getViolationsMap<FIELD extends string>(input: Violations<FIELD>): ViolationsMap<FIELD> {
    // TODO: 同じキーのオブジェクトが複数ある場合は、上書きされて最後のものだけが残る
    const out: ViolationsMap<FIELD> = {};
    for (const v of input) {
        out[v.field] = v.violation;
    }
    return out;
}
