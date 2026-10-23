import assert from 'node:assert';
import test, { before, describe, mock } from 'node:test';

import { assertThrows } from '@/tests/test-utils';

// clear & npm run node:test -- src/env/env.helper.validated.test.ts
void describe('env.helper.validated.test.ts の実行', async () => {
    const { env } = await import('@/env/src/internal/isomophic/env');
    // NOTE: typeof envにすると読み取り専用プロパティのためモックで値を設定できなくなるので注意
    const mockedEnv = {
        node_env: env.node_env,
        next_public_fw_debug_logger: env.next_public_fw_debug_logger,
    };

    type moduleType = typeof import('@/env/src/internal/isomophic/env.helper.validated');
    let envNodeEnvNext: moduleType['envNodeEnvNext'];
    let envNextPublicFwDebugLogger: moduleType['envNextPublicFwDebugLogger'];

    // NOTE: モジュールキャッシュがあるため、各テストでモジュールをimportしても最初にimportされたモジュールが参照され続ける。
    // モックを作成→テスト対象モジュールをimport→各テストでモックに値を設定の順にすること
    before(async () => {
        mock.module('@/env/src/internal/isomophic/env.ts', {
            namedExports: {
                env: mockedEnv,
            },
        });
        // モックしてからモジュールを読み込む
        const moduleName = '@/env/src/internal/isomophic/env.helper.validated';
        envNodeEnvNext = (await import(moduleName)).envNodeEnvNext;
        envNextPublicFwDebugLogger = (await import(moduleName)).envNextPublicFwDebugLogger;
    });

    ////////////////////////////
    // envFwDebugLogger
    ////////////////////////////

    // clear & npm run node:test -- --test-name-pattern=test1-1 src/env/env.helper.validated.test.ts
    void test('test1-1', async () => {
        mockedEnv.next_public_fw_debug_logger = '1';
        assert.equal(envNextPublicFwDebugLogger(), true);
    });

    // clear & npm run node:test -- --test-name-pattern=test1-2 src/env/env.helper.validated.test.ts
    void test('test1-2', async () => {
        mockedEnv.next_public_fw_debug_logger = undefined;
        assert.equal(envNextPublicFwDebugLogger(), false);
    });

    // clear & npm run node:test -- --test-name-pattern=test1-3 src/env/env.helper.validated.test.ts
    void test('test1-3', async () => {
        mockedEnv.next_public_fw_debug_logger = '';
        assert.equal(envNextPublicFwDebugLogger(), false);
    });

    // clear & npm run node:test -- --test-name-pattern=test1-4 src/env/env.helper.validated.test.ts
    void test('test1-4', async (t) => {
        mockedEnv.next_public_fw_debug_logger = '1 ';
        const error = assertThrows(() => envNextPublicFwDebugLogger());
        console.log(`${t.name}:\n`, error);
        assert.match(error.message, /真偽値は 1 または 0 を設定してください。/);
    });

    ////////////////////////////
    // envNodeEnvNext
    ////////////////////////////

    // clear & npm run node:test -- --test-name-pattern=test2-1 src/env/env.helper.validated.test.ts
    void test('test2-1', async (t) => {
        // NOTE: node環境で実行すると、process.env.NODE_ENVはundefinedになるので、その確認のため、環境変数はモックしない
        const error = assertThrows(() => envNodeEnvNext());
        console.log(`${t.name}:\n`, error);
        assert.match(error.message, /未定義の環境変数値です/);
    });

    // clear & npm run node:test -- --test-name-pattern=test2-2 src/env/env.helper.validated.test.ts
    void test('test2-2', async (t) => {
        mockedEnv.node_env = 'abc';
        const error = assertThrows(() => envNodeEnvNext());
        console.log(`${t.name}:\n`, error);
        assert.match(error.message, /未定義の環境変数値です/);
    });

    // clear & npm run node:test -- --test-name-pattern=test2-3 src/env/env.helper.validated.test.ts
    void test('test2-3', async () => {
        mockedEnv.node_env = 'production';
        assert.strictEqual(envNodeEnvNext(), 'production');
    });
});
