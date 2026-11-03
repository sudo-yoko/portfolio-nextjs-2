import { illegalStateError } from '@my/error';

import {
    APPLICATION_FORM,
    APPLICATION_JSON,
    CONTENT_TYPE,
} from '#client/internal/isomorphic/client.constants';
import { RequestConfig } from '#client/internal/isomorphic/client.types';

export function validateBodyConfig<BODY = never>(config: RequestConfig<BODY>) {
    const headers = new Headers(config.headers);
    const contentType = headers.get(CONTENT_TYPE) ?? undefined;
    const mediaType = contentType?.split(';')[0].trim();

    let valid: boolean = true;
    if (mediaType === APPLICATION_JSON) {
        if (config.bodyJson === undefined) {
            valid = false;
        }
        if (config.bodyUrlEncoded !== undefined) {
            valid = false;
        }
    } else if (mediaType === APPLICATION_FORM) {
        if (config.bodyJson !== undefined) {
            valid = false;
        }
        if (config.bodyUrlEncoded === undefined) {
            valid = false;
        }
    } else if (mediaType === undefined) {
        if (config.bodyJson !== undefined) {
            valid = false;
        }
        if (config.bodyUrlEncoded !== undefined) {
            valid = false;
        }
    } else {
        valid = false;
    }
    if (valid) return;
    throw illegalStateError({ message: 'MediaTypeとBodyの指定が不正です。' });
}
