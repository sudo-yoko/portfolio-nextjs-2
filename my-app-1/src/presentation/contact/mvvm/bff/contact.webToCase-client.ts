//
// 外部APIクライアント
//
import 'server-only';

//import client from '@/modules/(system)/clients/proxy-client';
import { CONTENT_TYPE_APPLICATION_FORM } from '@/presentation/(system)/client/client.constants';
import client from '@/presentation/(system)/client/client.s';
import { Method } from '@/presentation/(system)/client/client.types';
import { env } from '@/presentation/(system)/env/env.helper.validated';
import { retryableError } from '@/presentation/(system)/error/error.factories';
import logger from '@/presentation/(system)/logging/logger.s';
import { ContactBody } from '@/presentation/contact/mvvm/models/contact.types';

const logPrefix = 'contact.webToCase-client.ts: ';

export async function send(model: ContactBody): Promise<void> {
    const url = env('WEB_TO_CASE_URL');
    const body = new URLSearchParams(model).toString();
    logger.info(logPrefix + `Request(Outbound) -> url=${url}, body:${body}`);

    const result = await client.send({
        method: Method.POST,
        url,
        body,
        headers: { ...CONTENT_TYPE_APPLICATION_FORM },
        // ステータスコード200,408(タイムアウト)以外はエラーをスローする
        validateStatus: (status) => status === 200 || status === 408,
    });

    logger.info(logPrefix + `Response(Inbound) -> status=${result.status}`);
    if (result.status === 408) {
        throw retryableError(`web-to-case response status=${result.status}`);
    }
}
