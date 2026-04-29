import axios from 'axios';

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
export function stringify({
    error,
    description,
    details,
}: {
    error?: unknown;
    description?: string;
    details?: string;
}): {
    message: string;
    all: string;
} {
    if (typeof error === 'string') {
        const message = error;
        return { message, all: joinAll({ message, description, details }) };
        // } else if (axios.isAxiosError(error)) {
        //     //TODO; axios固有のエラーはclient.adapterで処理できないか
        //     const { message } = error;
        //     const stacks = getStackTrace(error);
        //     const all: All = { message, stacks };
        //     if (error.response) {
        //         all.details = `Axios Error: Response(Inbound) -> status=${error.response.status}, data=${error.response.data}`;
        //     }
        //     return { message, all: joinAll(all) };
    } else if (error instanceof Error) {
        const { message } = error;
        const stacks = getStackTrace(error);
        return { message, all: joinAll({ message, description, details, stacks }) };
    } else {
        const message = 'unknown type error.';
        return { message, all: joinAll({ message, description, details }) };
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
function joinAll({
    description,
    message,
    details,
    stacks,
}: {
    description?: string;
    message?: string;
    details?: string;
    stacks?: string[];
}): string {
    const errMessage: string[] = [];
    if (description) {
        errMessage.push(`\ndescription: ${description}`);
    }
    if (message) {
        errMessage.push(`\nmessage: ${message}`);
    }
    if (details) {
        errMessage.push(`\ndetails: ${details}`);
    }
    if (stacks) {
        errMessage.push(`\nstacks: \n${stacks?.join('\n')}`);
    }
    return errMessage.join('');
}

// 引数の型
type All = Parameters<typeof joinAll>[0];

/**
 * Errorオブジェクトの中からaxios固有のエラーを取得する
 */
export function getAxiosErrorProperties(err: unknown): string {
    const description: Record<string, unknown> = {};
    if (axios.isAxiosError(err)) {
        description['code'] = err.code;
        return JSON.stringify(description, null, 2);
    }
    return JSON.stringify(description, null, 2);
}

/**
 * Errorオブジェクトの中からnode:http固有のエラーを取得する
 */
export function getNodeErrorProperties(err: Error): string {
    const description: Record<string, unknown> = {};
    if ('code' in err) {
        description['code'] = err.code;
    }
    return JSON.stringify(description, null, 2);
}
