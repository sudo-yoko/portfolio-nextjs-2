import test from 'node:test';

import { authError } from '@/error/src/internal/error.factories';
import { getCustomErrorProperties } from '@/error/src/internal/error.helper.stringify';
import { isCustomError } from '@/error/src/internal/error.helpers';

//////////////////////////////
// getCustomErrorProperties
//////////////////////////////

// clear & npm run node:test -- --test-name-pattern='^test1-1$' src/error/error.helper.stringify.test.ts
void test('test1-1', () => {
    const e = authError({ location: 'error.factories.test.ts' });
    if (isCustomError(e)) {
        console.log('e=', JSON.stringify(e));
        const result = getCustomErrorProperties(e);
        console.log('result=', result);
        console.log('result(json.stringify)=', JSON.stringify(result));
    }
});
