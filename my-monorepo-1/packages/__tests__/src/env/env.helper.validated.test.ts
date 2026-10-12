import assert from 'node:assert';
import test from 'node:test';

//
// envFwDebugLogger
//
// npm exec -- node --test --experimental-test-module-mocks --import tsx --test-name-pattern=test1-1 src/env/env.helper.validated.test.ts
// npm run node:test -- --test-name-pattern=test1-1 src/env/env.helper.validated.test.ts
void test('test1-1', async (t) => {
    // next_public_fw_debug_logger をモックする
    t.mock.module('../../../env/src/internal/env.ts', {
        namedExports: {
            node_env: 'test',
            next_public_fw_debug_logger: undefined,
        },
    });
    // モックしてからモジュールを読み込む
    const { envFwDebugLogger } = await import('@/env/src/internal/env.helper.validated');
    assert.equal(envFwDebugLogger(), false);
});

// npm run node:test -- --test-name-pattern=test1-2 src/env/env.helper.validated.test.ts
void test('test1-2', async (t) => {
    // next_public_fw_debug_logger をモックする
    t.mock.module('../../../env/src/internal/env.ts', {
        namedExports: {
            node_env: 'test',
            next_public_fw_debug_logger: '',
        },
    });
    // モックしてからモジュールを読み込む
    const { envFwDebugLogger } = await import('@/env/src/internal/env.helper.validated');
    assert.equal(envFwDebugLogger(), false);
});

// clear & npm run node:test -- --test-name-pattern=test1-3 src/env/env.helper.validated.test.ts
void test('test1-3', async (t) => {
    // next_public_fw_debug_logger をモックする
    t.mock.module('../../../env/src/internal/env.ts', {
        namedExports: {
            node_env: 'test',
            next_public_fw_debug_logger: '1 ',
        },
    });
    // モックしてからモジュールを読み込む
    const { envFwDebugLogger } = await import('@/env/src/internal/env.helper.validated');
    assert.equal(envFwDebugLogger(), false);
});

// clear & npm run node:test -- --test-name-pattern=test1-4 src/env/env.helper.validated.test.ts
void test('test1-4', async (t) => {
    // next_public_fw_debug_logger をモックする
    t.mock.module('../../../env/src/internal/env.ts', {
        namedExports: {
            node_env: 'test',
            next_public_fw_debug_logger: '1',
        },
    });
    // モックしてからモジュールを読み込む
    const { envFwDebugLogger } = await import('@/env/src/internal/env.helper.validated');
    assert.equal(envFwDebugLogger(), true);
});

//
// envNodeEnvNext
//
// clear & npm run node:test -- --test-name-pattern=test2-1 src/env/env.helper.validated.test.ts
void test('test2-1', async () => {
    const { envNodeEnvNext } = await import('@/env/src/internal/env.helper.validated');
    try {
        // NOTE: node環境で実行すると、process.env.NODE_ENVはundefinedになる
        envNodeEnvNext();
    } catch (e) {
        console.log(e);
    }
});

// clear & npm run node:test -- --test-name-pattern=test2-2 src/env/env.helper.validated.test.ts
void test('test2-2', async (t) => {
    // node_env をモックする
    t.mock.module('../../../env/src/internal/env.ts', {
        namedExports: {
            node_env: 'abc',
            next_public_fw_debug_logger: '',
        },
    });
    // モックしてからモジュールを読み込む
    const { envNodeEnvNext } = await import('@/env/src/internal/env.helper.validated');
    try {
        envNodeEnvNext();
    } catch (e) {
        console.log(e);
    }
});

// clear & npm run node:test -- --test-name-pattern=test2-3 src/env/env.helper.validated.test.ts
void test('test2-3', async (t) => {
    // node_env をモックする
    t.mock.module('../../../env/src/internal/env.ts', {
        namedExports: {
            node_env: 'test',
            next_public_fw_debug_logger: '',
        },
    });
    // モックしてからモジュールを読み込む
    const { envNodeEnvNext } = await import('@/env/src/internal/env.helper.validated');
    const result = envNodeEnvNext();
    console.log(`result=${result}`);
    assert.strictEqual(result, 'test');
});
