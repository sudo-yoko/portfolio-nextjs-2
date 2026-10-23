//
// クライアントサイドでの env パッケージ使い勝手の検証
//
import test from 'node:test';

import {
    env,
    envNextPublicFwDebugLogger,
    envNextRuntime,
    envNodeEnv,
    envNodeEnvNext,
    envProtocolString,
    envStringValueOrDefault,
    envValidateBooleanValue,
    envValidateBooleanValueOrDefault,
    envValidateNumValue,
    envValidateNumValueOrDefault,
    envValidateProtocolValue,
    envValidateProtocolValueOrDefault,
    envValidateStringValue,
    NextRuntime,
    NodeEnvNext,
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

    // 環境変数：文字列　未設定の場合はエラーにしたいとき
    const value2 = envValidateStringValue(value1, { key: 'USER' });
    console.log(value2);

    // 環境変数：文字列　未設定の場合はデフォルト値が欲しいとき
    const defaultStringValue: string = '';
    const value3 = envStringValueOrDefault(value1, defaultStringValue);
    console.log(value3);

    // 環境変数：数値　未設定の場合はエラーにしたいとき
    const value4 = envValidateNumValue(value1, { key: 'USER' });
    console.log(value4);

    // 環境変数：数値　未設定の場合はデフォルト値が欲しいとき
    const defaultNumValue: number = 0;
    const value5 = envValidateNumValueOrDefault(value1, defaultNumValue, { key: 'USER' });
    console.log(value5);

    // 環境変数：真偽値　未設定の場合はエラーにしたいとき
    const value6 = envValidateBooleanValue(value1, { key: 'USER' });
    console.log(value6);

    // 環境変数：真偽値　未設定の場合はデフォルト値が欲しいとき
    const defaultBoolValue: boolean = false;
    const value7 = envValidateBooleanValueOrDefault(value1, defaultBoolValue, { key: 'USER' });
    console.log(value7);

    // 環境変数：プロトコル値　未設定の場合はエラーにしたいとき
    const value8 = envValidateProtocolValue(value1, { key: 'USER' });
    console.log(value8);

    // 環境変数：プロトコル値　未設定の場合はデフォルト値が欲しいとき
    const defaultProtocolValue = envProtocolString.Http;
    const value9 = envValidateProtocolValueOrDefault(value1, defaultProtocolValue, { key: 'USER' });
    console.log(value9);
    if (value9 === envProtocolString.Http) {
    }
});
