import { RESULT, Tag } from '#result/internal/result.types';
import { applicationError, formatError } from '@my/error';

type ResultDeserializer = (text: string) => RESULT;

/**
 * 型ガードを用いた自作パーサー
 */
function withTypeGuard(text: string): RESULT {
    const isResult = (text: unknown): text is RESULT => {
        if (text === null) {
            return false;
        }
        // プリミティブ型の場合
        if (typeof text !== 'object') {
            return false;
        }
        const tag = (text as RESULT).tag;
        if (tag === Tag.OkEmpty) {
            return true;
        }
        if (tag === Tag.OkData) {
            return true;
        }
        if (tag === Tag.Invalid) {
            return true;
        }
        if (tag === Tag.Retryable) {
            return true;
        }
        if (tag === Tag.Aborted) {
            return true;
        }
        return false;
    };
    try {
        const parsed = JSON.parse(text);
        if (isResult(parsed)) {
            return parsed;
        }
        throw applicationError({ message: text });
    } catch (error) {
        const message = `text=${text} error=${formatError({ error }).message}`;
        throw applicationError({ message });
    }
}

export const deserialize: ResultDeserializer = withTypeGuard;
