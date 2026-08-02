import { printf } from '@/tests/test-logger';

const logPrefix = '[test-logger.test.ts]';

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __development/tests/next-jest/test-logger.test.ts -t 'test1-1'
test('test1-1', () => {
    const testName = `[${expect.getState().currentTestName}]`;

    const message = 'diamond Scars';

    let stdout: boolean = false;
    let print = printf({ logPrefix, stdout });
    print(`${testName} stdout=${stdout}, ${message}`);
    print(testName, `stdout=${stdout}`, message);

    stdout = true;
    print = printf({ logPrefix, stdout });
    print(`${testName} stdout=${stdout}, ${message}`);
    print(testName, `stdout=${stdout}`, message);
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __development/tests/next-jest/test-logger.test.ts -t 'test1-2'
test('test1-2', () => {
    const testName = `[${expect.getState().currentTestName}]`;

    const messages: string[] = [];
    messages.push(`We're like diamonds in the fire.`);
    messages.push(`Burning through but rising higher.`);

    let stdout: boolean = false;
    let print = printf({ logPrefix, stdout });
    print(`${testName} stdout=${stdout}, ${messages}`);
    print(testName, `stdout=${stdout}`, messages);

    stdout = true;
    print = printf({ logPrefix, stdout });
    print(`${testName} stdout=${stdout}, ${messages}`);
    print(testName, `stdout=${stdout}`, messages);
});
