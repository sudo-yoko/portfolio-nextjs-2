export { deserialize } from '#result/internal/result.deserializer';
export { abort, invalid, okData, okEmpty, retry } from '#result/internal/result.factories';
export { isAborted, isInvalid, isOkData, isOkEmpty, isRetryable } from '#result/internal/result.helpers';
export type {
    Aborted,
    Invalid,
    OkData,
    OkEmpty,
    RESULT,
    Retryable,
    Tag,
} from '#result/internal/result.types';
