'use server';

import { withAuthAsync } from '@/presentation/(system)/auth/auth-handler';
import { withErrorHandlingAsync } from '@/presentation/(system)/errors/error-handler.bff';
import logger from '@/presentation/(system)/logging/logger.s';
import { BffResult } from '@/presentation/(system)/bff/bff.result.types';
import { FormData, Violations } from '@/presentation/(system)/validation/validation.types';
import { FormKeys } from '@/presentation/contact/mvvm/models/contact.types';
import { execute } from '@/presentation/contact/mvvm/bff/contact.interactor';

const logPrefix = 'contact.action.ts: ';

/**
 * お問い合わせの送信 サーバーアクション
 */
export async function post(
  formData: FormData<FormKeys>,
): Promise<BffResult<void, Violations<FormKeys>>> {
  return await withErrorHandlingAsync(() => withAuthAsync(() => func()));

  async function func() {
    logger.info(logPrefix + `formData=${JSON.stringify(formData)}`);
    return await execute(formData);
  }
}
