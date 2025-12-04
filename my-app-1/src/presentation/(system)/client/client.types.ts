// REST API クライントのライブラリ非依存のインターフェース型

/**
 * REST API クライアントのインターフェース型
 */
export type Client = {
  /**
   * リクエストを送信する
   */
  send<BODY = never, PARAMS = never>(req: Req<BODY, PARAMS>): Promise<Result>;
};

/**
 * HTTP メソッド定義
 */
export const Method = {
  GET: 'GET',
  POST: 'POST',
} as const;
export type Method = (typeof Method)[keyof typeof Method];

/**
 * リクエスト
 */
export type Req<BODY = never, PARAMS = never> = {
  method: Method;
  url: string;
  body?: BODY;
  params?: PARAMS;
  headers?: Record<string, string>;

  /**
   * どのステータスをエラーとするか指定可能
   */
  validateStatus?: (status: number) => boolean;
};

/**
 * 返却オブジェクト
 */
export type Result = {
  status: number;
  rawBody: string;
};
