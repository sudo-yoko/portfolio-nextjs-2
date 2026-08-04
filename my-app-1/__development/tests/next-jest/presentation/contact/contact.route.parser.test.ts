import { parse } from '@/presentation/contact/mvvm/bff/contact.route.parser';
import { printf } from '@/tests/test-logger';

const print = printf({ logPrefix: '[contact.route.parser.test.ts]', stdout: true });

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __development/tests/next-jest/presentation/contact/contact.route.parser.test.ts -t 'test1-1'
test('test1-1', async () => {
    const body = '{"name":"name-1","email":"email-1","body":"body-1"}';
    const req = new Request('http://localhost:3000', { method: 'POST', body });

    const parsed = await parse(req);
    print(`[${expect.getState().currentTestName}]`, 'result ->', parsed);
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __development/tests/next-jest/presentation/contact/contact.route.parser.test.ts -t 'test1-2'
test('test1-2', async () => {
    const body = '{"name":"name-1","email":"email-1","body":"body-1","detail":"detail-1"}';
    const req = new Request('http://localhost:3000', { method: 'POST', body });

    const parsed = await parse(req);
    print(`[${expect.getState().currentTestName}]`, 'result ->', parsed);
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __development/tests/next-jest/presentation/contact/contact.route.parser.test.ts -t 'test1-3'
test('test1-3', async () => {
    const body = '{"name":"name-1","email":"email-1"}';
    const req = new Request('http://localhost:3000', { method: 'POST', body });

    try {
        await parse(req);
    } catch (e) {
        print(`[${expect.getState().currentTestName}]`, 'result ->', e);
    }
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __development/tests/next-jest/presentation/contact/contact.route.parser.test.ts -t 'test1-4'
test('test1-4', async () => {
    const body = 'name:name-1';
    const req = new Request('http://localhost:3000', { method: 'POST', body });

    try {
        await parse(req);
    } catch (e) {
        print(`[${expect.getState().currentTestName}]`, 'result ->', e);
    }
});

// npm exec -- cross-env NODE_OPTIONS=--experimental-vm-modules jest __development/tests/next-jest/presentation/contact/contact.route.parser.test.ts -t 'test1-5'
test('test1-5', async () => {
    const body = '5'; // NOTE: これもJSON.parse可能
    const req = new Request('http://localhost:3000', { method: 'POST', body });

    print(JSON.parse(body));
    try {
        await parse(req);
    } catch (e) {
        print(`[${expect.getState().currentTestName}]`, 'result ->', e);
    }
});
