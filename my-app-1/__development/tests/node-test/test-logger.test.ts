import test from 'node:test';

import { printf } from '@/tests/test-logger';

const logPrefix = '[test-logger.test.ts]';

// npm exec -- node --test --import tsx --test-name-pattern='^test1-1$' __development/tests/node-test/test-logger.test.ts
test('test1-1', (t) => {
    const stdout: boolean = true;
    const print = printf({ logPrefix, stdout });
    print(`[${t.name}] diamond Scars`);
    print(`[${t.name}]`, 'diamond Scars');
});

// npm exec -- node --test --import tsx --test-name-pattern='^test1-2$' __development/tests/node-test/test-logger.test.ts
test('test1-2', (t) => {
    const stdout: boolean = true;
    const print = printf({ logPrefix, stdout });

    const messages: string[] = [];
    messages.push(`We're like diamonds in the fire.`);
    messages.push(`Burning through but rising higher.`);
    print(`[${t.name}] ${messages}`);
    print(`[${t.name}]`, messages);
});
