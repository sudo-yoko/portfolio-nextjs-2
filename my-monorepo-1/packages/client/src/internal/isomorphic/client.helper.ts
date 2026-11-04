import { RequestConfig } from '#client/internal/isomorphic/client.types';

export function stringify(config: RequestConfig<unknown>): string {
    const str: string[] = [];
    str.push(`method=${config.method}`);
    str.push(`url=${config.url}`);
    if (config.bodyJson) {
        str.push(`bodyJson=${JSON.stringify(config.bodyJson)}`);
    }
    if (config.bodyUrlEncoded) {
        str.push(`bodyUrlEncoded=${config.bodyUrlEncoded.toString()}`);
    }
    if (config.query) {
        str.push(`query=${config.query}`);
    }
    if (config.headers) {
        str.push(`headers=${JSON.stringify(config.headers)}`);
    }
    if (config.timeout) {
        str.push(`timeout=${config.timeout}`);
    }
    return str.join(', ');
}
