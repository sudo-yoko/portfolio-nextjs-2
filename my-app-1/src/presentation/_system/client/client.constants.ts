import { ValidateStatus } from '@/presentation/_system/client/client.types';

// headers
const CONTENT_TYPE = 'Content-Type';
const ACCEPT = 'Accept';
const APPLICATION_JSON = 'application/json';
const APPLICATION_FORM = 'application/x-www-form-urlencoded';
const TEXT_EVENT_STREAM = 'text/event-stream';
const CHARSET_UTF8 = 'charset=utf-8';

export const CONTENT_TYPE_APPLICATION_JSON_UTF8 = {
    [CONTENT_TYPE]: `${APPLICATION_JSON}; ${CHARSET_UTF8}`,
} as const satisfies HeadersInit;

export const CONTENT_TYPE_APPLICATION_FORM = {
    [CONTENT_TYPE]: APPLICATION_FORM,
} as const satisfies HeadersInit;

export const CONTENT_TYPE_TEXT_EVENT_STREAM_UTF8 = {
    [CONTENT_TYPE]: `${TEXT_EVENT_STREAM}; ${CHARSET_UTF8}`,
} as const satisfies HeadersInit;

export const ACCEPT_APPLICATION_JSON = {
    [ACCEPT]: APPLICATION_JSON,
} as const satisfies HeadersInit;

/**
 * レスポンスステータスの検証。
 * サーバーサイド（BFF ー＞ バックエンドサービス呼び出し時）は、ステータス500以上をエラー扱いとする
 */
export const defaultValidateStatusServer: ValidateStatus = (status) => status < 500;

/**
 * レスポンスステータスの検証。
 * クライアントサイド（クライアントサイド　ー＞　BFF呼び出し時）は、ステータス200以外をエラー扱いとする。エラーがあればリクエストボディに返すこと。
 */
export const defaultValidateStatusClient: ValidateStatus = (status) => status === 200;
