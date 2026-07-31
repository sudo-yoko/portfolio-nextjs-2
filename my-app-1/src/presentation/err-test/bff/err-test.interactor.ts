import 'server-only';

import { okData, okEmpty } from '@/presentation/_system/result/result.factories';
import { RESULT } from '@/presentation/_system/result/result.types';
import { requestHealthCheck, requestUsers } from '@/presentation/err-test/models/err-test-client.s';
import { HealthCheckResult, UsersResult } from '@/presentation/err-test/models/err-test.types';
import { ResUsers } from '@/presentation/err-test/models/err-test.users.parser';

export async function execute(err?: string): Promise<RESULT> {
    if (err === '25') {
        return await executeUsers();
    }
    return await executeHealthCheck();
}

async function executeHealthCheck(): Promise<HealthCheckResult> {
    await requestHealthCheck();
    return okEmpty();
}

async function executeUsers(): Promise<UsersResult<ResUsers>> {
    const result = await requestUsers();
    return okData(result);
}
