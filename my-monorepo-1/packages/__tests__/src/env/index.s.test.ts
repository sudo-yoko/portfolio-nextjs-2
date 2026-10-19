//
// サーバーサイドでの env パッケージ使い勝手の検証
//
import test from 'node:test';

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
import {
    env_s,
    envEnableLoggerInitialization,
    envNumber,
    envNumberOrDefault,
    envProtocol,
    envString,
    envStringOrDefault,
} from '@my/env/server';

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

void test('test1-4', () => {
    // process.env.ENABLE_LOGGER_INITIALIZATION
    const value1 = env_s.enable_logger_initialization;
    console.log(value1);

    const value2 = envEnableLoggerInitialization();
    console.log(value2);
});

void test('test1-5', () => {
    // ユーザー定義の環境変数

    // 生値
    const value1 = env_s.get('USER');
    console.log(value1);

    // 検証済みの値
    const value2 = envString('USER');
    console.log(value2);

    const value3 = envStringOrDefault('USER', '');
    console.log(value3);

    const value4 = envNumber('USER');
    console.log(value4);

    const value5 = envNumberOrDefault('USER', 0);
    console.log(value5);

    const value6 = envProtocol('USER');
    if (value6 === Protocol.Http) {
    }
    console.log(value6);
});
