import 'server-only';

import { okData, okEmpty } from '@/presentation/_system/result/result.factories';
import { send } from '@/presentation/err-test/bff/health-check.client';
import { requestUsers } from '@/presentation/err-test/bff/users.client';
import { ErrTestResult, UsersResult } from '@/presentation/err-test/models/err-test.types';
import { ResUsers } from '@/presentation/err-test/models/err-test.users.parser';

export async function execute(): Promise<ErrTestResult> {
    await send();
    return okEmpty();
}

export async function executeUsers(): Promise<UsersResult<ResUsers>> {
    const result = await requestUsers();
    return okData(result);
}
