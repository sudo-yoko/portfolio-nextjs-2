'use server';

import { executeAsync } from '@/presentation/(system)/aop/aop.feature.bff';
import { FormData } from '@/presentation/(system)/validation/validation.types';
import { execute } from '@/presentation/users/mvvm/bff/users.interactor';
import { FormKeys } from '@/presentation/users/mvvm/models/users.types';

export async function action(offset: number, limit: number, query: FormData<FormKeys>) {
  return await executeAsync(() => func());

  async function func() {
    return await execute(offset, limit, query);
  }
}
