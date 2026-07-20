'use server';

import { withAdviceAsync } from '@/presentation/_system/aspect/aspect.server-action';
import { RESULT } from '@/presentation/_system/result/result.types';
import { execute } from '@/presentation/err-test/bff/err-test.interactor';

export async function post(): Promise<RESULT> {
    return await withAdviceAsync(() => _());
    async function _() {
        return await execute();
    }
}
