//
// お問い合わせの送信 ユースケース
//
import 'server-only';

import { withErrorHandlingAsync } from '@/presentation/(system)/errors/error-handler.bff';
import logger from '@/presentation/(system)/logging/logger.s';
import type { BffResult } from '@/presentation/(system)/bff/bff-result';
import { ok, reject, REJECTION_LABELS } from '@/presentation/(system)/bff/bff-result';
import { hasError } from '@/presentation/(system)/validation/validation.helper';
import { FormData, Violations } from '@/presentation/(system)/validation/validation.types';
import { FormKeys } from '@/presentation/contact/mvvm/models/contact.types';
import { validate } from '@/presentation/contact/mvvm/models/contact.validator';
import { send } from '@/presentation/contact/mvvm/bff/contact.webToCase-client';

const logPrefix = 'usecase.ts: ';

/**
 * ユースケースの実行
 */
export async function execute(
  formData: FormData<FormKeys>,
): Promise<BffResult<void, Violations<FormKeys>>> {
  return await withErrorHandlingAsync(() => func());

  async function func() {
    logger.info(logPrefix + `formData=${JSON.stringify(formData)}`);
    //
    // バリデーション
    //
    const violations = validate(formData);
    if (hasError(violations)) {
      logger.info(logPrefix + `validation error. ${JSON.stringify(violations)}`);
      return reject(REJECTION_LABELS.VIOLATION, violations);
    }
    //
    // 送信
    //
    await send({ ...formData });
    return ok();
  }
}
