import 'server-only';

import { okData, okEmpty } from '@/presentation/_system/result/result.factories';
import { requestUsers } from '@/presentation/err-test/bff/users.client';
import { ErrTestResult, UsersResult } from '@/presentation/err-test/models/err-test.types';
import { ResUsers } from '@/presentation/err-test/models/err-test.users.parser';
import { requestHealthCheck } from './health-check.client';

export async function executeHealthCheck(): Promise<ErrTestResult> {
    await requestHealthCheck();
    return okEmpty();
}

export async function executeUsers(): Promise<UsersResult<ResUsers>> {
    const result = await requestUsers();
    return okData(result);
}
