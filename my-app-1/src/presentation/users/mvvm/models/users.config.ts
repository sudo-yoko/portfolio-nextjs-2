import {
    ACCEPT_APPLICATION_JSON,
    CONTENT_TYPE_APPLICATION_JSON_UTF8,
} from '@/presentation/_system/client/client.constants';
import { Method, RequestConfig } from '@/presentation/_system/client/client.types';
import { FormData } from '@/presentation/_system/validation/validation.types';
import { FormKeys, UsersQuery } from '@/presentation/users/mvvm/models/users.types';

export type PartialRequestConfig<BODY, QUERY> = Pick<
    RequestConfig<BODY, QUERY>,
    'method' | 'headers' | 'body' | 'query'
>;

export function requestConfig(
    query: UsersQuery,
    formData: FormData<FormKeys>,
): PartialRequestConfig<FormData<FormKeys>, UsersQuery> {
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
