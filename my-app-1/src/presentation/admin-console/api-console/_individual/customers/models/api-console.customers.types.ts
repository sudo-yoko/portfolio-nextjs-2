import { ACCEPT_APPLICATION_JSON } from '@/presentation/_system/client/client.constants';
import { Method, RequestConfig } from '@/presentation/_system/client/client.types';

export const FormKeys = {
    customerId: 'customerId',
} as const;
export type FormKeys = (typeof FormKeys)[keyof typeof FormKeys];

export type PartialRequestConfig<BODY, QUERY> = Pick<
    RequestConfig<BODY, QUERY>,
    'method' | 'headers' // TODO: 型にできるか
>;

export function requestConfig(): PartialRequestConfig<never, never> {
    return {
        method: Method.GET,
        headers: { ...ACCEPT_APPLICATION_JSON },
    };
}
