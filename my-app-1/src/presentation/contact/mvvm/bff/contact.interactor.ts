//
// お問い合わせの送信 ユースケース
//
import 'server-only';

import type { BffResult } from '@/presentation/(system)/result/result.bff.types';
import logger from '@/presentation/(system)/logging/logger.s';
import { invalid, okEmpty } from '@/presentation/(system)/result/result.core.factories';
import { hasError } from '@/presentation/(system)/validation/validation.helper';
import { FormData } from '@/presentation/(system)/validation/validation.types';
import { send } from '@/presentation/contact/mvvm/bff/contact.webToCase-client';
import { FormKeys } from '@/presentation/contact/mvvm/models/contact.types';
import { validate } from '@/presentation/contact/mvvm/models/contact.validator';

const logPrefix = 'contact.interactor.ts: ';

/**
 * ユースケースの実行
 */
export async function execute(formData: FormData<FormKeys>): Promise<BffResult<void, FormKeys>> {
  logger.info(logPrefix + `formData=${JSON.stringify(formData)}`);
  //
  // バリデーション
  //
  const violations = validate(formData);
  if (hasError(violations)) {
    logger.info(logPrefix + `validation error. ${JSON.stringify(violations)}`);
    //return reject(REJECTION_LABELS.VIOLATION, violations);
    return invalid(violations);
  }
  //
  // 送信
  //
  await send({ ...formData });
  return okEmpty();
}
