//
// API クライアントの実装 ( Fetch API )
//
import 'client-only';

import { Client, Req, Result } from '@/presentation/(system)/client/client.types';
import { backendApiError } from '@/presentation/(system)/errors/custom-error';
import logger from '@/presentation/(system)/logging/logger.c';

const logPrefix = 'client.impl.fetch.ts: ';

export const clientImpl: Client = {
  send: async <BODY = never, PARAMS = never>(req: Req<BODY, PARAMS>) => {
    // デフォルトは、500 以上のステータスコードの場合はエラーをスローする
    const validateStatus = req.validateStatus ?? ((status: number) => status < 500);

    const res = await fetch(req.url, {
      method: req.method,
      headers: req.headers,
      body: JSON.stringify(req.body),
    });

    // ステータスコードの検証
    if (!validateStatus(res.status)) {
      const err = backendApiError(`Request -> ${JSON.stringify(req)}, Response -> status=${res.status}`);
      logger.error(logPrefix + err.message);
      throw err;
    }

    const rawBody = await res.text();
    const result: Result = {
      status: res.status,
      rawBody,
    };
    logger.info(logPrefix + `Request -> ${JSON.stringify(req)}, Result -> ${JSON.stringify(result)}`);
    return result;
  },
};
