import 'server-only';

import { okData, okEmpty } from '@/presentation/_system/result/result.factories';
import { RESULT } from '@/presentation/_system/result/result.types';
import { requestHealthCheckError } from '@/presentation/backend-lib/health-check/health-check.client';
import { requestUsers } from '@/presentation/backend-lib/users/users.client';
import { Users } from '@/presentation/backend-lib/users/users.types';
import { HealthCheckResult, UsersResult } from '@/presentation/err-test/models/err-test.types';

export async function execute(err?: string): Promise<RESULT> {
    if (err === '25') {
        return await executeUsers();
    }
    return await executeHealthCheckError();
}

async function executeHealthCheckError(): Promise<HealthCheckResult> {
    await requestHealthCheckError();
    return okEmpty();
}

async function executeUsers(): Promise<UsersResult<Users>> {
    const result = await requestUsers('aaa', '1', '10');
    return okData(result);
}
