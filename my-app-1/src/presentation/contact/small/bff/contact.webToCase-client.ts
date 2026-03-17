import 'server-only';

import { CONTENT_TYPE_APPLICATION_FORM } from '@/presentation/_system/client/client.constants';
import { createClient } from '@/presentation/_system/client/client.factory.s';
// import client from '@/presentation/_system/client/client.s';
import { Method } from '@/presentation/_system/client/client.types';
import { env } from '@/presentation/_system/env/env.helper.validated';
import { retryableError } from '@/presentation/_system/error/error.factories';
import logger from '@/presentation/_system/logging/logger.s';
import { ContactBody } from '@/presentation/contact/small/models/contact.types';

const logPrefix = 'contact.webToCase-client.ts: ';
const client = await createClient('axios-proxy');

export async function send(model: ContactBody): Promise<void> {
    const url = env('WEB_TO_CASE_URL');
    const body = new URLSearchParams(model).toString();
    logger.info(logPrefix + `Request(Outbound) -> url=${url}, body:${body}`);

    const result = await client.send({
        method: Method.POST,
        url,
        body,
        headers: { ...CONTENT_TYPE_APPLICATION_FORM },
        validateStatus: (status: number) => status === 200,
    });

    logger.info(logPrefix + `Response(Inbound) -> status=${result.status}`);
    if (result.status !== 200) {
        throw retryableError(`web-to-case response status=${result.status}`);
    }
}
