import 'server-only';

import { okEmpty } from '@/presentation/_system/result/result.factories';
import { send } from '@/presentation/err-test/bff/health-check.client';
import { ErrTestResult } from '@/presentation/err-test/models/err-test.types';

export async function execute(): Promise<ErrTestResult> {
    await send();
    return okEmpty();
}
