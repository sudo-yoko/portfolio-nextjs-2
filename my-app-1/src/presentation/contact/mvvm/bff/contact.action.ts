//
// お問い合わせの送信 サーバーアクション
//
'use server';

import logger from '@/presentation/(system)/logging/logger.s';
import { withInterceptionAsync } from '@/presentation/(system)/middleware/interceptor.bff';
import { BffResult } from '@/presentation/(system)/result/result.bff.types';
import { FormData } from '@/presentation/(system)/validation/validation.types';
import { execute } from '@/presentation/contact/mvvm/bff/contact.interactor';
import { FormKeys } from '@/presentation/contact/mvvm/models/contact.types';

const logPrefix = 'contact.action.ts: ';

export async function post(formData: FormData<FormKeys>): Promise<BffResult<void, FormKeys>> {
  return await withInterceptionAsync(() => func());

  async function func() {
    logger.info(logPrefix + `formData=${JSON.stringify(formData)}`);
    return await execute(formData);
  }
}
