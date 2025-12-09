'use server';

import { withAuthAsync } from '@/presentation/(system)/auth/auth-handler';
import { BffResult } from '@/presentation/(system)/result/result.bff.types';
import { withErrorHandlingAsync } from '@/presentation/(system)/errors/error-handler.bff';
import logger from '@/presentation/(system)/logging/logger.s';
import { FormData } from '@/presentation/(system)/validation/validation.types';
import { execute } from '@/presentation/contact/mvvm/bff/contact.interactor';
import { FormKeys } from '@/presentation/contact/mvvm/models/contact.types';

const logPrefix = 'contact.action.ts: ';

/**
 * お問い合わせの送信 サーバーアクション
 */
export async function post(formData: FormData<FormKeys>): Promise<BffResult<void, FormKeys>> {
  return await withErrorHandlingAsync(() => withAuthAsync(() => func()));

  async function func() {
    logger.info(logPrefix + `formData=${JSON.stringify(formData)}`);
    return await execute(formData);
  }
}
