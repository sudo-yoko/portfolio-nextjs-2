import 'server-only';

import { CONTENT_TYPE_APPLICATION_FORM } from '@/presentation/_system/client/client.constants';
import { loadClient } from '@/presentation/_system/client/client.factory.s';
import { Method } from '@/presentation/_system/client/client.types';
import { env } from '@/presentation/_system/env/env.helper.validated';
import { retryableError } from '@/presentation/_system/error/error.factories';
import logger from '@/presentation/_system/logging/logger.s';
import { Form, toQueryString } from '@/presentation/_system/types/search-params';

const logPrefix = 'webToCase.client.ts: ';

const client = await loadClient('axios-proxy');

export async function requestWebToCase(form: Form): Promise<void> {
    const url = env('WEB_TO_CASE_URL');
    const body = toQueryString(form);
    logger.info(logPrefix + `Request -> url=${url}, body:${body}`);

    const result = await client.send({
        method: Method.POST,
        url,
        body,
        headers: { ...CONTENT_TYPE_APPLICATION_FORM },
        // validateStatus: (status: number) => status === 200,
    });

    logger.info(logPrefix + `Response -> status=${result.status}`);
    if (result.status !== 200) {
        throw retryableError({ message: `web-to-case response status=${result.status}` });
        // throw codedError("ERR0001", "何かのエラー");
        // throw Error('何かのエラー');
    }
}
