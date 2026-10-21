import test, { before, describe, mock } from 'node:test';

///////////////////////////
// envNumberOrDefault
///////////////////////////

// clear & npm run node:test -- src/env/env.s.helper.validated.test.ts
void describe('env.s.helper.validated.ts#envNumberOrDefault のテスト', () => {
    const mockedEnv = {
        get: (_key: string) => "" as string | undefined
    };
    type TargetModule = typeof import('@/env/src/internal/env.s.helper.validated');
    let mockedEnvNumberOrDefault: TargetModule['envNumberOrDefault'];

    before(async () => {
        mock.module('server-only', { defaultExport: {}, namedExports: {} });
        mock.module('@/env/src/internal/env.s.ts', {
            namedExports: {
                env_s: mockedEnv,
            },
        });
        mockedEnvNumberOrDefault = (await import('@/env/src/internal/env.s.helper.validated')).envNumberOrDefault;
    });

    void test('test1-1', () => {
        mockedEnv.get = () => ""
        const result = mockedEnvNumberOrDefault ("aa", 1);
        console.log(result);

    })
});
