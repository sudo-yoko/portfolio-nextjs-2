//
// API クライアントの実装 ( Fetch API )
// クライアントサイド -> BFF(APIルート)のリクエストで使用する
//
import 'client-only';

import { Client, Req, Result } from '@/presentation/(system)/client/client.types';
import { backendApiError } from '@/presentation/(system)/errors/error.factories';
import logger from '@/presentation/(system)/logging/logger.c';

const logPrefix = 'client.impl.fetch.ts: ';

export const clientImpl: Client = {
  send: async <BODY = never, PARAMS = never>(req: Req<BODY, PARAMS>) => {
    // クライアントサイド -> BFF(APIルート)間リクエストでは、ステータスコード200のみとする。
    // エラーの場合はレスポンスボディにエラー情報を設定する
    // 200以外が返ってきたら例外をスローする
    const validateStatus = req.validateStatus ?? ((status: number) => status === 200);

    const res = await fetch(req.url, {
      method: req.method,
      headers: req.headers,
      body: JSON.stringify(req.body), // オブジェクトをJSON.stringifyして渡す
    });

    // ステータスコードの検証
    if (!validateStatus(res.status)) {
      const err = backendApiError(`Request -> ${JSON.stringify(req)}, Response -> status=${res.status}`);
      logger.error(logPrefix + err.message);
      throw err;
    }

    const rawBody = await res.text(); // bodyがjsonとは限らないのでtextで取得する。エラーの場合はhtmlが返ってくることもある
    const result: Result = {
      status: res.status,
      rawBody,
    };
    logger.info(logPrefix + `Request -> ${JSON.stringify(req)}, Result -> ${JSON.stringify(result)}`);
    return result;
  },
};
