import 'server-only';

import { withAdviceAsync } from '@/presentation/_system/aspect/aspect.route-handler';
import { execute } from '@/presentation/err-test/bff/err-test.interactor';

const logPrefix = 'err-test.route.ts';

export async function GET(): Promise<Response> {
    return await withAdviceAsync(() => _());
    async function _() {
        return await execute();
    }
}
