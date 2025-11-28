//
// 外部APIクライアント
//
import 'server-only';

//import client from '@/modules/(system)/clients/proxy-client';
import { CONTENT_TYPE_APPLICATION_FORM } from '@/presentation/(system)/client/client.constants';
import client from '@/presentation/(system)/client/client.s';
import { Method } from '@/presentation/(system)/client/client.types';
import { env } from '@/presentation/(system)/env/env-validated.s';
import { withErrorHandlingAsync } from '@/presentation/(system)/errors/error-handler.server';
import logger from '@/presentation/(system)/logging/logger.s';
import { ContactBody } from '@/presentation/contact/mvvm/models/contact.types';

const logPrefix = 'contact2-client.ts: ';

export async function send(model: ContactBody): Promise<void> {
  // エラーハンドリングを追加して処理を実行する。
  return await withErrorHandlingAsync(() => func());

  async function func() {
    const url = env('WEB_TO_CASE_URL');
    const body = new URLSearchParams(model).toString();
    logger.info(logPrefix + `Request(Outbound) -> url=${url}, body:${body}`);

    const result = await client.send({
      method: Method.POST,
      url,
      body,
      headers: { ...CONTENT_TYPE_APPLICATION_FORM },
    });

    // const res = await client.send(url, body, {
    // headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded',
    // },
    // });/
    logger.info(logPrefix + `Response(Inbound) -> status=${result.status}`);
  }
}
