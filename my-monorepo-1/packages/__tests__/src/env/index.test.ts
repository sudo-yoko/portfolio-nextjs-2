//
// クライアントサイドでの env パッケージ使い勝手の検証
//
import test from 'node:test';

import {
    envValidateNumValue,
    envValidateProtocolValue,
    envValidateStringValue,
} from '@/env/src/internal/env.utils';
import {
    env,
    envNextPublicFwDebugLogger,
    envNextRuntime,
    envNodeEnv,
    envNodeEnvNext,
    NextRuntime,
    NodeEnvNext,
    Protocol,
} from '@my/env';

void test('test1-1', () => {
    // process.env.NODE_ENV
    // 生値取得
    const value1 = env.node_env;
    console.log(value1);

    // 検証済みの値を取得
    const value2 = envNodeEnv();
    console.log(value2);

    const value3 = envNodeEnvNext();
    if (value3 === NodeEnvNext.Dev) {
    }
    console.log(value3);
});

void test('test1-2', () => {
    // process.env.NEXT_RUNTIME
    // 生値
    const value1 = env.next_runtime;
    console.log(value1);
    // 検証済みの値
    const value2 = envNextRuntime();
    if (value2 === NextRuntime.Edge) {
    }
    console.log(value2);
});

void test('test1-3', () => {
    // process.env.NEXT_PUBLIC_FW_DEBUG_LOGGER
    const value1 = env.next_public_fw_debug_logger;
    console.log(value1);

    const value2 = envNextPublicFwDebugLogger();
    console.log(value2);
});

void test('test1-5', () => {
    // ユーザー定義の環境変数

    // 生値
    const value1 = process.env.USER;
    console.log(value1);

    // 検証済みの値
    const value2 = envValidateStringValue(value1, 'USER');
    console.log(value2);

    const defaultStringValue: string = '';
    const value3 = envValidateStringValue(value1 ?? defaultStringValue, 'USER');
    console.log(value3);

    const defaultNumValue: string = '0';
    const value4 = envValidateNumValue(value1 ?? defaultNumValue, 'USER');
    console.log(value4);

    const defaultProtocolValue: string = 'http';
    const value5 = envValidateProtocolValue(value1 ?? defaultProtocolValue);
    console.log(value5);
    if (value5 === Protocol.Http) {
    }
});
