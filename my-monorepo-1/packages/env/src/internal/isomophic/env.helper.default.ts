//
// 環境変数が未設定の場合にデフォルト値を指定するヘルパー
//
import { isEnvSet } from '#env/internal/isomophic/env';
import { envBooleanString, envProtocolString } from '#env/internal/isomophic/env.types';
import {
    envValidateBooleanValue,
    envValidateNumValue,
    envValidateProtocolValue,
} from '#env/internal/isomophic/env.validator';

function envValueOrDefault(value: string | undefined, defaultValue: string): string {
    if (isEnvSet(value)) {
        return value;
    }
    return defaultValue;
}

export function envStringValueOrDefault(value: string | undefined, defaultValue: string): string {
    return envValueOrDefault(value, defaultValue);
}

export function envValidateNumValueOrDefault(
    value: string | undefined,
    defaultValue: number,
    option?: { key?: string },
): number {
    return envValidateNumValue(envValueOrDefault(value, String(defaultValue)), option);
}

export function envValidateBooleanValueOrDefault(
    value: string | undefined,
    defaultValue: boolean,
    option?: { key?: string },
): boolean {
    return envValidateBooleanValue(
        envValueOrDefault(value, defaultValue ? envBooleanString.True : envBooleanString.False),
        option,
    );
}

export function envValidateProtocolValueOrDefault(
    value: string | undefined,
    defaultValue: envProtocolString,
    option?: { key?: string },
): envProtocolString {
    return envValidateProtocolValue(envValueOrDefault(value, defaultValue), option);
}
