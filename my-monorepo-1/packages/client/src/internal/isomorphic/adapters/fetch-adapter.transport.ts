import { RawResponse } from '#client/internal/isomorphic/client.types';

export async function executeFetch(...args: Parameters<typeof fetch>): Promise<RawResponse> {
    const res = await fetch(...args);
    const rawBody = await res.text();
    const status = res.status;
    return { status, rawBody };
}
