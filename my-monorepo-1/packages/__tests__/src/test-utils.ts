import assert from 'node:assert';

export function assertThrows(block: Parameters<typeof assert.throws>[0]) {
    let error: Error = new Error();
    assert.throws(block, (e) => {
        if (e instanceof Error) {
            error = e;
            return true;
        }
        return false;
    });
    return error;
}

// env.strategy.ts#isEnvSetのモック
export const definedOnlyMock = (value: string | undefined): value is string => {
    return value !== undefined;
};

export const definedAndNotBlankMock = (value: string | undefined): value is string => {
    return value !== undefined && value.trim().length > 0;
};
