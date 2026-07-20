import axios from 'axios';

import { isCustomError } from '@/presentation/_system/error/error.helpers';
import {
    CustomErrorProperties,
    ERR_CODE,
    ERR_TYPE,
    EXTRA,
    LOCATION,
    RESULT_TYPE,
} from '@/presentation/_system/error/error.types';

/**
 * Errorオブジェクトの文字列表現を作成する
 *
 * @param error - キャッチされたエラー
 * @param description - エラーの説明
 * @param details - エラーの詳細
 * @returns
 * - `message`: エラーメッセージのみ（スタックトレースを含まない）
 * - `all`: スタックトレースを含むすべてのメッセージ
 */
export function formatError(props: {
    error?: unknown;
    option?: object;
    description?: string;
    details?: object;
    location?: string;
}): {
    message: string;
    all: string;
} {
    const { error, option, description, details, location } = props;
    if (!error) {
        const message = '';
        return { message, all: joinAll({ description, message, details, location, option }) };
    } else if (typeof error === 'string') {
        const message = error;
        return { message, all: joinAll({ description, message, details, location, option }) };
    } else if (error instanceof Error) {
        const { name, message } = error;
        const stacks = getStackTrace(error);
        return { message, all: joinAll({ description, name, message, details, location, stacks, option }) };
    } else {
        const message = 'unknown type error.';
        return { message, all: joinAll({ description, message, details, location, option }) };
    }
}

/**
 * Errorオブジェクトからスタックトレースを取得する
 *
 * @param error - Errorオブジェクト
 * @returns スタックトレースの配列
 */
function getStackTrace(error: Error): string[] {
    const stacks: string[] = [];
    if (error.stack) stacks.push(error.stack);
    let { cause } = error;
    while (cause instanceof Error) {
        if (cause.stack) {
            stacks.push('Caused by');
            stacks.push(cause.stack);
        }
        cause = cause.cause;
    }
    // スタックトレースを発生した順番に並べ替える
    // return stacks.reverse();
    return stacks;
}

/**
 * エラーメッセージを組み立てる
 *
 * @param description - エラーの説明
 * @param message - エラーメッセージ
 * @param details - エラー詳細
 * @param stack - スタックトレース
 * @returns エラーメッセージ
 */
function joinAll(props: {
    description?: string;
    name?: string;
    message?: string;
    option?: object;
    details?: object;
    location?: string;
    stacks?: string[];
}): string {
    const { description, name, message, option, details, location, stacks } = props;
    const errMessage: string[] = [];
    if (description) {
        errMessage.push(description);
    }
    if (location) {
        errMessage.push(`\nlocation: ${location}`);
    }
    if (name) {
        errMessage.push(`\nname: ${name}`);
    }
    if (message) {
        errMessage.push(`\nmessage: ${message}`);
    }
    if (option) {
        errMessage.push(`\noption: ${JSON.stringify(option, null, 2)}`);
    }
    if (details) {
        errMessage.push(`\ndetails: ${JSON.stringify(details, null, 2)}`);
    }
    if (stacks) {
        errMessage.push(`\nstacks: \n${stacks?.join('\n')}`);
    }
    return errMessage.join('');
}

// NOTE: 引数の型を取得
type All = Parameters<typeof joinAll>[0];

/**
 * Errorオブジェクトの中からaxios固有のプロパティを取得する
 */
export function getAxiosErrorProperties(err: unknown): object {
    const option: Record<string, unknown> = {};
    if (axios.isAxiosError(err)) {
        option['code'] = err.code;
        option['status'] = err.response?.status ?? 'undefined';
        option['message'] = err.message;
        // return { str: JSON.stringify(option, null, 2), obj: option };
    }
    // return { str: JSON.stringify(option, null, 2), obj: option };
    return option;
}

/**
 * Errorオブジェクトの中からnode:http固有のプロパティを取得する
 */
export function getNodeErrorProperties(err: Error): object {
    const option: Record<string, unknown> = {};
    if ('code' in err) {
        option['code'] = err.code;
    }
    // return JSON.stringify(option, null, 2);
    return option;
}

/**
 * Errorオブジェクトの中からカスタムエラー固有のプロパティを取得する
 */
export function getCustomErrorProperties(err: unknown): CustomErrorProperties {
    const option: CustomErrorProperties = {};
    if (isCustomError(err)) {
        option.errType = err[ERR_TYPE]; // TODO: ログにERR_TYPE出さない方がよいかもしれない
        option.location = err[LOCATION];
        option.extra = err[EXTRA];
        if (ERR_CODE in err) {
            option.code = err[ERR_CODE];
        }
        if (RESULT_TYPE in err) {
            option.result = err[RESULT_TYPE];
        }
    }
    // NOTE: シンボル（ERR_TYPE]、[ERR_CODE]、[RESULT_TYPE]）はJSON.stringifyでシリアライズできない（無視される）？
    // const text = isEmpty(option) ? undefined : JSON.stringify(option, null, 2);
    //  return { text, option };
    return option;
}

function isEmpty(obj: Record<string, unknown>): boolean {
    const values = Object.values(obj);
    return values.length === 0 || values.every((v) => v === undefined);
}
