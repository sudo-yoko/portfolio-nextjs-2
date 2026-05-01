import { ACCEPT_APPLICATION_JSON } from '@/presentation/_system/client/client.constants';
import { Method, RequestConfig } from '@/presentation/_system/client/client.types';

export const FormKeys = {
    customerId: 'customerId',
} as const;
export type FormKeys = (typeof FormKeys)[keyof typeof FormKeys];

// TODO: 後で削除
export type PartialRequestConfig<BODY> = Pick<
    RequestConfig<BODY>,
    'method' | 'headers' // TODO: 型にできるか
>;

// export function requestConfig(): PartialRequestConfig<never, never> {
//     return {
//         method: Method.GET,
//         headers: { ...ACCEPT_APPLICATION_JSON },
//     };
// }

// TODO: 後で削除
export const requestConfig: PartialRequestConfig<never> = {
    method: Method.GET,
    headers: { ...ACCEPT_APPLICATION_JSON },
};
