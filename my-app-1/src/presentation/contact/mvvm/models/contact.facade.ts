//
// お問い合わせの送信 バックエンド・ファサード
//
// バックエンド呼び出し処理の詳細を隠蔽し、UI向けにシンプルな呼び出し窓口を提供するレイヤー。
// クライアント→BFF→バックエンドAPIといった複数レイヤーにまたがるリクエストをファサードの背面に隠し、UIには呼び出し関数のみを提供する。
//
import 'client-only';

import { CONTENT_TYPE_APPLICATION_JSON_UTF8 } from '@/presentation/(system)/client/client.constants';
import { boundaryError } from '@/presentation/(system)/errors/custom-error';
import logger from '@/presentation/(system)/logging/logger.c';
import {
  Completed,
  isOk,
  isReject,
  parseBoundaryResult,
  REJECTION_LABELS,
} from '@/presentation/(system)/bff/boundary-result';
import { FormData, Violations } from '@/presentation/(system)/validation/validation.types';
import { action } from '@/presentation/contact/mvvm/bff/contact.action';
import { FormKeys } from '@/presentation/contact/mvvm/models/contact.types';
import client from '@/presentation/(system)/client/client.c';
import { Method } from '@/presentation/(system)/client/client.types';

/**
 *
 */
type SendRequest = {
  (formData: FormData<FormKeys>): Promise<Completed<void, Violations<FormKeys>>>;
};

/**
 * Server Actions による実装
 */
const _viaAction: SendRequest = async (formData) => {
  // Server Action を呼び出す
  const result = await action(formData);
  if (isOk(result)) {
    return result;
  }
  if (isReject(result) && result.label === REJECTION_LABELS.VIOLATION) {
    return result;
  }
  throw boundaryError(JSON.stringify(result));
};

/**
 * Route Handlers による実装
 */
const viaRoute: SendRequest = async (formData) => {
  // Route Handler を呼び出す
  const url = '/api/contact/mvvm';
  const { name, email, body } = formData;

  const res = await client.send({
    url,
    method: Method.POST,
    headers: {
      ...CONTENT_TYPE_APPLICATION_JSON_UTF8,
    },
    body: JSON.stringify({ name, email, body }),
    validateStatus: (status) => status === 200,
  });

  const parsed = parseBoundaryResult<void, Violations<FormKeys>>(res.rawBody);
  if (parsed !== null) {
    if (isOk(parsed)) {
      return parsed;
    }
    if (isReject(parsed) && parsed.label === REJECTION_LABELS.VIOLATION) {
      return parsed;
    }
  }
  throw boundaryError(res.rawBody);
};

/**
 * お問い合わせを送信する
 */
export const sendRequest: SendRequest = viaRoute;
