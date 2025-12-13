'use server';

import { withErrorHandlingAsync } from '@/presentation/(system)/error/error.handler.bff';
import { FormData } from '@/presentation/(system)/validation/validation.types';
import { execute } from '@/presentation/users/min/modules/users.interactor';
import { FormKeys } from '@/presentation/users/min/modules/users.types';

export async function action(offset: number, limit: number, query: FormData<FormKeys>) {
  return await withErrorHandlingAsync(() => func());

  async function func() {
    return await execute(offset, limit, query);
  }
}
