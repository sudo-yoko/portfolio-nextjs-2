import {
    ACCEPT_APPLICATION_JSON,
    CONTENT_TYPE_APPLICATION_JSON_UTF8,
} from '@/presentation/_system/client/client.constants';
import { Method, QueryParam, RequestConfig } from '@/presentation/_system/client/client.types';
import { FormData } from '@/presentation/_system/validation/validation.types';
import { FormKeys, UsersQuery } from '@/presentation/users/mvvm/models/users.types';

// TODO: 後で削除
export type PartialRequestConfig<BODY> = Pick<
    RequestConfig<BODY>,
    'method' | 'headers' | 'body' | 'query'
>;

// TODO: 後で削除
export function requestConfig(
    query: QueryParam,
    formData: FormData<FormKeys>,
): PartialRequestConfig<FormData<FormKeys>> {
    return {
        method: Method.POST,
        headers: { ...ACCEPT_APPLICATION_JSON, ...CONTENT_TYPE_APPLICATION_JSON_UTF8 },
        query,
        body: formData,
    };
}

// export type Criteria = {
//     offset: number;
//     limit: number;
//     formData: FormData<FormKeys>;
//     options?: {
//         userId?: string;
//     };
// };
