import { deserialize } from '@/presentation/contact/mvvm/bff/contact.deserializer';

const body = {
    name: 'Test User',
    email: 'test@example.com',
    zipcode: '1234567',
    address1: 'Address line 1',
    address2: 'Address line 2',
    body: 'Contact message',
};
const fields = Object.keys(body) as (keyof typeof body)[];
const request = (value: unknown) =>
    new Request('http://localhost:3000', { method: 'POST', body: JSON.stringify(value) });

describe('contact deserializer', () => {
    test('returns all six required string fields', async () => {
        await expect(deserialize(request(body))).resolves.toStrictEqual({ body });
    });

    test('strips extra fields', async () => {
        await expect(deserialize(request({ ...body, detail: 'extra' }))).resolves.toStrictEqual({ body });
    });

    test.each(fields)('accepts an empty string for %s', async (field) => {
        const input = { ...body, [field]: '' };
        await expect(deserialize(request(input))).resolves.toStrictEqual({ body: input });
    });

    test.each(fields)('rejects a missing %s', async (field) => {
        const input: Partial<typeof body> = { ...body };
        delete input[field];
        await expect(deserialize(request(input))).rejects.toThrow();
    });

    describe.each(fields)('%s must be a string', (field) => {
        test.each([null, 42, true, [], {}])('rejects %j', async (value) => {
            await expect(deserialize(request({ ...body, [field]: value }))).rejects.toThrow();
        });
    });

    test.each([null, 5, 'text', []])('rejects a non-object JSON body: %j', async (value) => {
        await expect(deserialize(request(value))).rejects.toThrow();
    });

    test('rejects malformed JSON', async () => {
        const req = new Request('http://localhost:3000', { method: 'POST', body: '{"name":' });
        await expect(deserialize(req)).rejects.toMatchObject({ name: 'SyntaxError' });
    });
});
