import test, { before, describe, mock } from 'node:test';

///////////////////////////
// envNumberOrDefault
///////////////////////////

// clear & npm run node:test -- src/env/env.s.helper.validated.test.ts
void describe('env.s.helper.validated.ts#envNumberOrDefault のテスト', () => {
    const mockedEnv = {
        get: (_key: string) => '' as string | undefined,
    };
    type moduleType = typeof import('@/env/src/internal/server/env.s.helper.validated');
    let envNumberOrDefault: moduleType['envNumberOrDefault'];

    before(async () => {
        mock.module('server-only', { defaultExport: {}, namedExports: {} });
        mock.module('@/env/src/internal/server/env.s.ts', {
            namedExports: {
                env_s: mockedEnv,
            },
        });
        const moduleName = '@/env/src/internal/server/env.s.helper.validated';
        envNumberOrDefault = (await import(moduleName)).envNumberOrDefault;
    });

    void test('test1-1', () => {
        mockedEnv.get = () => ''; // 環境変数未設定
        const result = envNumberOrDefault('key', 1);
        console.log(result);
    });
});
